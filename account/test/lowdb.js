const low = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");
const adapter = new FileSync("db.json");
const db = low(adapter);
//初始化;
// db.defaults({ posts: [], user: {} }).write();

//写入数据
// db.get("posts").push({ id: 1, title: "wocao" }).write();
// db.get("posts").push({ id: 2, title: "wocao" }).write();
// db.get("posts").unshift({ id: 3, title: "wocao" }).write();

//获取数据
// console.log(db.get("posts").value());

//删除数据
// db.get("posts").remove({ id: 3 }).write();

//更新数据
// db.get("posts").find({ id: 2 }).assign({ title: "今天下雨" }).write();
