"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.get("/test", (req, res) => {
    res.send("Hello World");
});
app.post("/verify", (req, res) => {
    var _a;
    const code = (_a = req === null || req === void 0 ? void 0 : req.body) === null || _a === void 0 ? void 0 : _a.code;
    const arrCode = code.split("");
    const lastDigit = arrCode[arrCode.length - 1];
    try {
        if (arrCode.length !== 6 || lastDigit === "7") {
            res.status(400).send("Invalid code");
            return;
        }
        res.send("verified");
    }
    catch (error) { }
});
app.listen(3000, () => {
    console.log("Server is running on http://localhost:3000");
});
