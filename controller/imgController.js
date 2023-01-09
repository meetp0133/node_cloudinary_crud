const userModel = require("../model/userImg")
const cloudinary = require("../middalware/cloudinary");
const url = require("url")
const helper = require("../helper/helper")
const uploader = require("../middalware/multer");
const {
    SUCCESSFUL, ACTIVE, DELETED, META_STATUS_0, META_STATUS_1, SERVERERROR, EXITING, FAILURE
} = require("../config/key")
const Sentry = require("@sentry/node");


exports.upload = async (req, res) => {
    try {
        const reqParam = req.body
        const exitingUser = await userModel.findOne({name: reqParam.name, status: ACTIVE})
        if (exitingUser) {
            Sentry.captureException("Already Exists");
            return helper.success(res, META_STATUS_0, "Already Exist..!!", EXITING)
        }
        const result = await cloudinary.v2.uploader.upload(req.file.path);

        const user = new userModel({
            name: req.body.name,
            imageURL: result.secure_url,
            cloudinary_Id: result.public_id
        });
        await user.save()
        const data = {
            status: user.status,
            userId: user._id,
            name: user.name,
            imageURL: user.imageURL,
            cloudinary_Id: user.cloudinary_Id
        }
        return helper.success(res, META_STATUS_1, "Image Added successfully..!!", SUCCESSFUL, data)
    } catch (e) {
        Sentry.captureException("Something wrong..!!");
        return helper.error(res, "Something wrong..!!", SERVERERROR)

    }
};

exports.getImage = async (req, res) => {
    try {
        const exitingUser = await userModel.findOne({_id: req.params.id, status: ACTIVE})
        if (!exitingUser) {
            Sentry.captureException("User not found..!!");
            return helper.error(res, "User not found..!!", FAILURE)
        }
        // const image = await cloudinary.url(req.params.public_id,{width:200,height: 500, crop: "fill"})
        const imageUrl = await cloudinary.url(exitingUser.cloudinary_Id)
        return helper.success(res, META_STATUS_1, "Get image URL successfully..!!", SUCCESSFUL, imageUrl)
    } catch (e) {
        Sentry.captureException("Something wrong..!!");
        return helper.error(res, "Something wrong..!!", SERVERERROR)

    }
};

exports.deleteImage = async (req, res) => {
    try {
        const findUser = await userModel.findOne({_id: req.params.id, status: ACTIVE})
        if (!findUser) {
            await Sentry.captureException("Enter valid userId..!!");
            return helper.error(res, "Enter valid userId..!!", FAILURE)
        }
        const deleteImage = await cloudinary.v2.uploader.destroy(findUser.cloudinary_Id)
        const updatestatus = await userModel.findOneAndUpdate({_id: req.params.id}, {$set: {status: DELETED}})
        const userDetails = {
            userName: findUser.name,
            cloudinary_Id: findUser.cloudinary_Id,
            result_status: deleteImage.result
        }
        return helper.success(res, META_STATUS_1, "Image deleted successfully..!!", SUCCESSFUL, userDetails)
    } catch (e) {
        await Sentry.captureException("Something wrong..!!");
        return helper.error(res, "Something wrong..!!", SERVERERROR)

    }
}

exports.updateImage = async (req, res) => {
    try {
        const user = await userModel.findOne({_id: req.params.id, status: ACTIVE})
        if (!user) {
            await Sentry.captureException("User not found..!!");
            return helper.error(res, "User not found..!!", FAILURE)
        }
        const deleteImage = await cloudinary.v2.uploader.destroy(user.cloudinary_Id)

        const result = await cloudinary.v2.uploader.upload(req.file.path);
        const updateUser = await userModel.findOneAndUpdate({_id: req.params.id}, {
            $set: {
                cloudinary_Id: result.public_id,
                imageURL: result.secure_url
            }
        })
        const data = {
            name: user.name,
            imageURL: result.secure_url,
            cloudinary_Id: result.public_id
        }
        return helper.success(res, META_STATUS_1, "Image updated successfully..!!", SUCCESSFUL, data)
    } catch (e) {
        await Sentry.captureException("Something wrong..!!");
        return helper.error(res, "Something wrong..!!", SERVERERROR)

    }
}

exports.viewUser = async (req, res) => {
    try {
        const userData = await userModel.findOne({_id: req.params.id, status: ACTIVE})
        if (!userData) {
            Sentry.captureException("Enter valid userId..!!");
            return helper.error(res, "Enter valid userId..!!",FAILURE

            )
        }
        const data = {
            status: userData.status,
            userId: userData._id,
            name: userData.name,
            imageURL: userData.imageURL,
            cloudinary_Id: userData.cloudinary_Id
        }
        return helper.success(res, META_STATUS_1, "User details listed successfully..!!", SUCCESSFUL, data)
    } catch (e) {
        await Sentry.captureException("Something wrong..!!");
        return helper.error(res, "Something wrong..!!", SERVERERROR)
    }
}
