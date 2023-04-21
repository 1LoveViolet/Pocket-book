const express = require("express");
const router = express.Router();
const UserModel = require("../../models/UserModel");
const md5 = require("md5");
//注册页面
router.get("/reg", (req, res) => {
  res.render("reg");
});
//注册
router.post("/reg", (req, res) => {
  UserModel.create({ ...req.body, password: md5(req.body.password) }).then(
    (data) => {
      if (!data) {
        res.status(500).send("注册失败");
        return;
      }
      res.render("success", { msg: "注册成功哦", url: "/login" });
    }
  );
});

//登录页面
router.get("/login", (req, res) => {
  res.render("login");
});
//登录
router.post("/login", (req, res) => {
  let username = req.body.username;
  let password = md5(req.body.password);
  UserModel.findOne({ $and: [{ username: username }, { password: password }] })
    .then((data) => {
      if (!data) {
        res.status(500).send("密码错误");
        return;
      }
      //写入session
      req.session.username = data.username;
      req.session._id = data._id;
      res.render("success", { msg: "登录成功哦", url: "/account" });
    })
    .catch((err) => {
      if (err) {
        res.status(500).send("登录失败，请稍后再试");
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
