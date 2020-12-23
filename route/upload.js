const multer = require('multer')
const upload = multer({dest: 'uploads/'})
const express = require('express')
const uploadUrl = express.Router()
const fs = require('fs')
const type = upload.single('file')
const { baseUrl } = require('../config/baseurl')

uploadUrl.post('/', type, (req, res) => {
    let fileExtArr = req.file.originalname.split('.')
    let ext = fileExtArr[fileExtArr.length - 1]
    let oldFile = req.file.path
    let newFile = req.file.path + '.' + ext
    fs.rename(oldFile, newFile, (err) => {
        if (err) {
            return res.json({
                'data': null,
                'meta': {
                    'status': 400,
                    'message': '文件上传失败'
                }
            })
        }
        return res.json({
            'data': {
                'tmp_path': '\\' + newFile,
                'url': baseUrl + "\\" + newFile
            },
            'meta': {
                'status': 200,
                'message': '文件上传成功'
            }
        })
    })
})

module.exports = uploadUrl