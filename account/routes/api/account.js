var express = require("express");
var router = express.Router();
const jwt = require("jsonwebtoken");
//导入moment
const moment = require("moment");
const AccountModel = require("../../models/AccountModel");
const checkTokenMiddleware = require("../../middlewares/checkTokenMiddleware");
//记账单列表
router.get("/account", checkTokenMiddleware, function (req, res, next) {
  AccountModel.find()
    .sort({ time: -1 })
    .exec()
    .then((data) => {
      if (!data) {
        res.json({
          code: "1001",
          msg: "读取失败",
          data: null,
        });
        return;
      }
      res.json({
        code: "0000",
        msg: "读取成功",
        data: data,
      });
    });
});

//添加记录
router.get("/account/create", checkTokenMiddleware, function (req, res, next) {
  res.render("create");
});

//新增记录
router.post("/account", checkTokenMiddleware, (req, res) => {
  //转化日期string为date
  //插入数据库
  AccountModel.create({
    ...req.body,
    time: moment(req.body.time).toDate(),
  }).then((data) => {
    if (!data) {
      res.json({
        code: "1002",
        msg: "创建失败",
        data: null,
      });
      return;
    }
    res.json({
      code: "0000",
      msg: "创建成功",
      data: data,
    });
  });
});

//删除记录
router.delete("/account/:id", checkTokenMiddleware, (req, res) => {
  let id = req.params.id;
  AccountModel.deleteOne({ _id: id }).then((data) => {
    if (!data) {
      res.json({
        code: "1003",
        msg: "删除失败",
        data: null,
      });
      return;
    }
    res.json({
      code: "0000",
      msg: "删除成功",
      data: data,
    });
  });
});

//获取单个账单信息
router.get("/account/:id", checkTokenMiddleware, (req, res) => {
  let { id } = req.params;
  AccountModel.findById(id).then((data) => {
    if (!data) {
      res.json({
        code: "1004",
        msg: "查询失败",
        data: null,
      });
    }
    res.json({
      code: "0000",
      msg: "查询成功",
      data: data,
    });
  });
});

//更新账单接口
router.patch("/account/:id", checkTokenMiddleware, (req, res) => {
  let { id } = req.params;
  AccountModel.updateOne({ _id: id }, req.body).then((data) => {
    if (!data) {
      res.json({
        code: "1005",
        msg: "更新失败",
        data: null,
      });
    }
    AccountModel.findById(id).then((data) => {
      if (!data) {
        res.json({
          code: "1004",
          msg: "查询失败",
          data: null,
        });
      }
      res.json({
        code: "0000",
        msg: "更新成功",
        data: data,
      });
    });
  });
});
module.exports = router;
