const express = require("express");
const router = express.Router();
const UserModel = require("../../models/UserModel");
const md5 = require("md5");
const jwt = require("jsonwebtoken");
//登录页面
router.get("/login", (req, res) => {
  res.render("login");
});
//登录
router.post("/login", (req, res) => {
  let { username, password } = req.body;
  UserModel.findOne({ $and: [{ username: username }, { password: password }] })
    .then((data) => {
      if (!data) {
        res.json({
          code: "2002",
          msg: "用户名或密码失败",
          data: null,
        });
        return;
      }
      let token = jwt.sign(
        {
          username: data.username,
          _id: data._id,
        },
        "token",
        {
          expiresIn: 60 * 60 * 24 * 7,
        }
      );
      res.json({
        code: "0000",
        msg: "登录成功",
        token: token,
      });
    })
    .catch((err) => {
      if (err) {
        res.json({
          code: "2001",
          msg: "数据库读取失败",
          data: null,
        });
        return;
      }
    });
});

//推出登录
router.get("/logout", (req, res) => {
  req.session.destroy(() => {
    res.render("success", { msg: "退出成功", url: "/login" });
  });
});
module.exports = router;
