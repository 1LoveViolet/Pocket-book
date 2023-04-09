const mongoose = require("mongoose");
let UserSchema = new mongoose.Schema({
  username: String,
  password: String,
});
//创建模型对象 对文档操作的封装对象
let UserModel = mongoose.model("users", UserSchema);
module.exports = UserModel;
