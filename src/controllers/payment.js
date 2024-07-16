require("dotenv").config();
const moment = require("moment");
const qs = require("qs");
const CryptoJS = require("crypto-js");
const axios = require("axios");
const config = {
  app_id: process.env.app_id_zalo,
  key1: process.env.key1_zalo,
  key2: process.env.key2_zalo,
  endpoint: process.env.endpoint_zalo,
};
const paymentController = {
  async createPaymentZaloPay(req, res) {
    const { amount, userId } = req.body;
    const embed_data = {
      //sau khi hoàn tất thanh toán sẽ đi vào link này (thường là link web thanh toán thành công của mình)
      // redirecturl: "http://localhost:3000/success",
      redirecturl: `http://localhost:3000/paymentResult`,
      // redirecturl: 'https://ft-book.vercel.app/',
    };

    const items = [];
    const transID = Math.floor(Math.random() * 1000000);

    const order = {
      app_id: config.app_id,
      app_trans_id: `${moment().format("YYMMDD")}_${transID}`, // translation missing: vi.docs.shared.sample_code.comments.app_trans_id
      app_user: userId,
      app_time: Date.now(), // miliseconds
      item: JSON.stringify(items),
      embed_data: JSON.stringify(embed_data),
      amount: amount.toString(),
      //khi thanh toán xong, zalopay server sẽ POST đến url này để thông báo cho server của mình
      //Chú ý: cần dùng ngrok để public url thì Zalopay Server mới call đến được
      callback_url:
        "https://d22e-2405-4802-be9f-f2c0-5c68-6267-7784-8e3b.ngrok-free.app/callback_Zalopay",
      // callback_url: 'https://backend-book-store-two.vercel.app/callback_Zalopay',
      description: `Thanh toán cho đơn hàng #${transID}`,
      bank_code: "",
    };

    // appid|app_trans_id|appuser|amount|apptime|embeddata|item
    const data =
      config.app_id +
      "|" +
      order.app_trans_id +
      "|" +
      order.app_user +
      "|" +
      order.amount +
      "|" +
      order.app_time +
      "|" +
      order.embed_data +
      "|" +
      order.item;
    order.mac = CryptoJS.HmacSHA256(data, config.key1).toString();

    try {
      const result = await axios.post(config.endpoint, null, { params: order });

      // return res.status(200).json(result.data);
      return res.status(200).json({
        ...result.data,
        app_trans_id: order.app_trans_id,
      });
    } catch (error) {
      console.log(error);
    }
  },
  async getPaymentUrl(req, res) {
    const { app_trans_id } = req.query;

    // Tạo URL thanh toán với app_trans_id
    const paymentUrl = `http://localhost:3000/payment-result?app_trans_id=${app_trans_id}`;

    // Trả về URL thanh toán cho frontend
    return res.json({ payment_url: paymentUrl });
  },
  async callBackPaymentZaloPay(req, res) {
    let result = {};
    console.log(req.body);
    try {
      let dataStr = req.body.data;
      let reqMac = req.body.mac;

      let mac = CryptoJS.HmacSHA256(dataStr, config.key2).toString();
      console.log("mac =", mac);

      // kiểm tra callback hợp lệ (đến từ ZaloPay server)
      if (reqMac !== mac) {
        // callback không hợp lệ
        result.return_code = -1;
        result.return_message = "mac not equal";
      } else {
        // thanh toán thành công
        // merchant cập nhật trạng thái cho đơn hàng ở đây
        let dataJson = JSON.parse(dataStr, config.key2);
        console.log(
          "update order's status = success where app_trans_id =",
          dataJson["app_trans_id"]
        );

        result.return_code = 1;
        result.return_message = "success";
      }
    } catch (ex) {
      console.log("lỗi:::" + ex.message);
      result.return_code = 0; // ZaloPay server sẽ callback lại (tối đa 3 lần)
      result.return_message = ex.message;
    }

    // thông báo kết quả cho ZaloPay server
    res.json(result);
  },
  async checkStatusPaymentZaloPay(req, res) {
    const { app_trans_id } = req.body;

    let postData = {
      app_id: config.app_id,
      app_trans_id, // Input your app_trans_id
    };

    let data =
      postData.app_id + "|" + postData.app_trans_id + "|" + config.key1; // appid|app_trans_id|key1
    postData.mac = CryptoJS.HmacSHA256(data, config.key1).toString();

    let postConfig = {
      method: "post",
      url: "https://sb-openapi.zalopay.vn/v2/query",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      data: qs.stringify(postData),
    };

    try {
      const result = await axios(postConfig);
      console.log(result.data);
      return res.status(200).json(result.data);
      /**
       * kết quả mẫu
        {
          "return_code": 1, // 1 : Thành công, 2 : Thất bại, 3 : Đơn hàng chưa thanh toán hoặc giao dịch đang xử lý
          "return_message": "",
          "sub_return_code": 1,
          "sub_return_message": "",
          "is_processing": false,
          "amount": 50000,
          "zp_trans_id": 240331000000175,
          "server_time": 1711857138483,
          "discount_amount": 0
        }
      */
    } catch (error) {
      console.log("lỗi");
      console.log(error);
    }
  },
};
module.exports = paymentController;
