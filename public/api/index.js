//弹窗样式
iziToast.settings({
  timeout: 10000,
  progressBar: false,
  close: false,
  closeOnEscape: true,
  position: "topCenter",
  transitionIn: "bounceInDown",
  transitionOut: "flipOutX",
  displayMode: "replace",
  layout: "1",
  backgroundColor: "#00000040",
  titleColor: "#efefef",
  messageColor: "#efefef",
  icon: "Fontawesome",
  iconColor: "#efefef",
});
//加载完成后执行
window.addEventListener(
  "load",
  function () {
    $("#bg").css(
      "cssText",
      "transform: scale(1);filter: blur(0px);transition: ease 1.5s;"
    );
    $(".cover").css("cssText", "opacity: 1;transition: ease 1.5s;");
    $("#section").css(
      "cssText",
      "transform: scale(1) !important;opacity: 1 !important;filter: blur(0px) !important"
    );

    //延迟加载音乐播放器
    let element = document.createElement("script");
    element.src = "../api/music.js";
    document.body.appendChild(element);

    //中文字体缓加载-此处写入字体源文件 （暂时弃用）
    //先行加载简体中文子集，后续补全字集
    //由于压缩过后的中文字体仍旧过大，可转移至对象存储或 CDN 加载
    // const font = new FontFace(
    //     "MiSans",
    //     "url(" + "./font/MiSans-Regular.woff2" + ")"
    // );
    // document.fonts.add(font);
  },
  false
);

setTimeout(function () {
  $("#loading-text").html("字体及文件加载可能需要一定时间");
}, 3000);

// 新春灯笼 （ 需要时可取消注释 ）
// new_element=document.createElement("link");
// new_element.setAttribute("rel","stylesheet");
// new_element.setAttribute("type","text/css");
// new_element.setAttribute("href","./css/lantern.css");
// document.body.appendChild(new_element);

// new_element=document.createElement("script");
// new_element.setAttribute("type","text/javascript");
// new_element.setAttribute("src","./js/lantern.js");
// document.body.appendChild(new_element);

// 获取天气
// 请前往 https://www.mxnzp.com/doc/list 申请 app_id 和 app_secret
// const mainKey = "c577e8a40049cf51879ff72c9dc1ae8e"; // 高德开发者 Key
// const getWeather = () => {
//   fetch(`https://restapi.amap.com/v3/ip?key=${mainKey}`)
//     .then((response) => response.json())
//     .then((res) => {
//       const adcode = res.adcode;
//       $("#city_text").html(res.city);
//       fetch(
//         `https://restapi.amap.com/v3/weather/weatherInfo?key=${mainKey}&city=${adcode}`
//       )
//         .then((response) => response.json())
//         .then((res) => {
//           if (res.status) {
//             $("#wea_text").html(res.lives[0].weather);
//             $("#tem_text").html(res.lives[0].temperature + "°C&nbsp;");
//             $("#win_text").html(res.lives[0].winddirection + "风");
//             $("#win_speed").html(res.lives[0].windpower + "级");
//           } else {
//             console.error("天气信息获取失败");
//             iziToast.show({
//               timeout: 2000,
//               icon: "fa-solid fa-cloud-sun",
//               message: "天气信息获取失败",
//             });
//           }
//         });
//     })
//     .catch((err) => {
//       console.error("天气信息获取失败：" + err);
//       iziToast.show({
//         timeout: 2000,
//         icon: "fa-solid fa-cloud-sun",
//         message: "天气信息获取失败",
//       });
//     });
// };

// getWeather();

// let wea = 0;
// $("#upWeather").click(function () {
//   if (wea == 0) {
//     wea = 1;
//     let index = setInterval(function () {
//       wea--;
//       if (wea == 0) {
//         clearInterval(index);
//       }
//     }, 60000);
//     getWeather();
//     iziToast.show({
//       timeout: 2000,
//       icon: "fa-solid fa-cloud-sun",
//       message: "实时天气已更新",
//     });
//   } else {
//     iziToast.show({
//       timeout: 1000,
//       icon: "fa-solid fa-circle-exclamation",
//       message: "请稍后再更新哦",
//     });
//   }
// });

//获取时间
let t = null;
t = setTimeout(time, 1000);

function time() {
  clearTimeout(t);
  dt = new Date();
  let y = dt.getYear() + 1900;
  let mm = dt.getMonth() + 1;
  let d = dt.getDate();
  let weekday = [
    "星期日",
    "星期一",
    "星期二",
    "星期三",
    "星期四",
    "星期五",
    "星期六",
  ];
  let day = dt.getDay();
  let h = dt.getHours();
  let m = dt.getMinutes();
  let s = dt.getSeconds();
  if (h < 10) {
    h = "0" + h;
  }
  if (m < 10) {
    m = "0" + m;
  }
  if (s < 10) {
    s = "0" + s;
  }
  $("#time").html(
    y +
      "&nbsp;年&nbsp;" +
      mm +
      "&nbsp;月&nbsp;" +
      d +
      "&nbsp;日&nbsp;" +
      "<span class='weekday'>" +
      weekday[day] +
      "</span><br>" +
      "<span class='time-text'>" +
      h +
      ":" +
      m +
      ":" +
      s +
      "</span>"
  );
  t = setTimeout(time, 1000);
}

//链接提示文字
$("#social")
  .mouseover(function () {
    $("#social").css({
      background: "rgb(0 0 0 / 25%)",
      "border-radius": "6px",
      "backdrop-filter": "blur(5px)",
    });
    $("#link-text").css({
      display: "block",
    });
  })
  .mouseout(function () {
    $("#social").css({
      background: "none",
      "border-radius": "6px",
      "backdrop-filter": "none",
    });
    $("#link-text").css({
      display: "none",
    });
  });

$("#github").mouseover(function () {
  $("#link-text").html("Github");
});
$("#qq").mouseover(function () {
  $("#link-text").html("QQ");
});
$("#email").mouseover(function () {
  $("#link-text").html("Email");
});
$("#bilibili").mouseover(function () {
  $("#link-text").html("BiliBili");
});
$("#telegram").mouseover(function () {
  $("#link-text").html("微博");
});

//自动变灰
let myDate = new Date();
let mon = myDate.getMonth() + 1;
let date = myDate.getDate();
let days = ["4.4", "5.12", "7.7", "9.9", "9.18", "12.13"];
for (let day of days) {
  let d = day.split(".");
  if (mon == d[0] && date == d[1]) {
    document.write(
      "<style>html{-webkit-filter:grayscale(100%);-moz-filter:grayscale(100%);-ms-filter:grayscale(100%);-o-filter:grayscale(100%);filter:progid:DXImageTransform.Microsoft.BasicImage(grayscale=1);_filter:none}</style>"
    );
    $("#change").html("Silence&nbsp;in&nbsp;silence");
    $("#change1").html("今天是中国国家纪念日，全站已切换为黑白模式");
    window.addEventListener(
      "load",
      function () {
        setTimeout(function () {
          iziToast.show({
            timeout: 14000,
            icon: "fa-solid fa-clock",
            message: "今天是中国国家纪念日",
          });
        }, 3800);
      },
      false
    );
  }
}

//更多页面切换
let shoemore = false;
$("#switchmore").on("click", function () {
  shoemore = !shoemore;
  if (shoemore && $(document).width() >= 990) {
    $("#container").attr("class", "container mores");
    $("#change").html("Oops&nbsp;!");
    $("#change1").html("哎呀，这都被你发现了（ 再点击一次可关闭 ）");
  } else {
    $("#container").attr("class", "container");
    $("#change").html("Hello&nbsp;World&nbsp;!");
    $("#change1").html("一个不正经的Up");
  }
});

//更多页面关闭按钮
$("#close").on("click", function () {
  $("#switchmore").click();
});

//移动端菜单栏切换
let switchmenu = false;
$("#switchmenu").on("click", function () {
  switchmenu = !switchmenu;
  if (switchmenu) {
    $("#row").attr("class", "row menus");
    $("#menu").html("<i class='fa-solid fa-xmark'></i>");
  } else {
    $("#row").attr("class", "row");
    $("#menu").html("<i class='fa-solid fa-bars'></i>");
  }
});

//更多弹窗页面
$("#openmore").on("click", function () {
  $("#box").css("display", "block");
  $("#row").css("display", "none");
  $("#more").css("cssText", "display:none !important");
});
$("#closemore").on("click", function () {
  $("#box").css("display", "none");
  $("#row").css("display", "flex");
  $("#more").css("display", "flex");
});

//监听网页宽度
window.addEventListener("load", function () {
  window.addEventListener("resize", function () {
    //关闭移动端样式
    if (window.innerWidth >= 600) {
      $("#row").attr("class", "row");
      $("#menu").html("<i class='fa-solid fa-bars'></i>");
      //移除移动端切换功能区
      $("#rightone").attr("class", "row rightone");
    }

    if (window.innerWidth <= 990) {
      //移动端隐藏更多页面
      $("#container").attr("class", "container");
      $("#change").html("Hello&nbsp;World&nbsp;!");
      $("#change1").html("一个不正经的Up");

      //移动端隐藏弹窗页面
      $("#box").css("display", "none");
      $("#row").css("display", "flex");
      $("#more").css("display", "flex");
    }
  });
});

//移动端切换功能区
let changemore = false;
$("#changemore").on("click", function () {
  changemore = !changemore;
  if (changemore) {
    $("#rightone").attr("class", "row menus mobile");
  } else {
    $("#rightone").attr("class", "row menus");
  }
});

//更多页面显示关闭按钮
$("#more").hover(
  function () {
    $("#close").css("display", "block");
  },
  function () {
    $("#close").css("display", "none");
  }
);

//屏蔽右键
document.oncontextmenu = function () {
  iziToast.show({
    timeout: 2000,
    icon: "fa-solid fa-circle-exclamation",
    message: "为了浏览体验，本站禁用右键",
  });
  return false;
};
