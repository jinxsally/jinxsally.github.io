let server = "netease"; //netease: 网易云音乐; tencent: QQ音乐; kugou: 酷狗音乐; xiami: 虾米; kuwo: 酷我
let type = "song"; //song: 单曲; playlist: 歌单; album: 唱片
let id = "1465162316"; //封面 ID / 单曲 ID / 歌单 ID

$.ajax({
  url:
    "https://api.injahow.cn/meting/?server=" +
    server +
    "&type=" +
    type +
    "&id=" +
    id,
  type: "GET",
  dataType: "JSON",
  success: function (data) {
    const ap = new APlayer({
      container: document.getElementById("aplayer"),
      order: "random",
      preload: "auto",
      listMaxHeight: "336px",
      volume: "0.5",
      mutex: true,
      lrcType: 3,
      audio: data,
      // 自动播放
      // autoplay: true,
    });

    /* 底栏歌词 */
    setInterval(function () {
      $("#lrc").html(
        "<span class='lrc-show'><svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' width='18' height='18'><path fill='none' d='M0 0h24v24H0z'/><path d='M12 13.535V3h8v3h-6v11a4 4 0 1 1-2-3.465z' fill='rgba(255,255,255,1)'/></svg>&nbsp;" +
          $(".aplayer-lrc-current").text() +
          "&nbsp;<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' width='18' height='18'><path fill='none' d='M0 0h24v24H0z'/><path d='M12 13.535V3h8v3h-6v11a4 4 0 1 1-2-3.465z' fill='rgba(255,255,255,1)'/></svg></span>"
      );
    }, 500);

    /* 音乐通知及控制 */
    ap.on("play", function () {
      music = $(".aplayer-title").text() + $(".aplayer-author").text();
      iziToast.info({
        timeout: 4000,
        icon: "fa-solid fa-circle-play",
        displayMode: "replace",
        message: music,
      });
      $("#play").html("<i class='fa-solid fa-pause'>");
      $("#music-name").html(
        $(".aplayer-title").text() + $(".aplayer-author").text()
      );
      if ($(document).width() >= 990) {
        $(".power").css("cssText", "display:none");
        $("#lrc").css("cssText", "display:block !important");
      }
    });

    ap.on("pause", function () {
      $("#play").html("<i class='fa-solid fa-play'>");
      if ($(document).width() >= 990) {
        $("#lrc").css("cssText", "display:none !important");
        $(".power").css("cssText", "display:block");
      }
    });

    $("#music").hover(
      function () {
        $(".music-text").css("display", "none");
        $(".music-volume").css("display", "flex");
      },
      function () {
        $(".music-text").css("display", "block");
        $(".music-volume").css("display", "none");
      }
    );

    /* 上下曲 */
    $("#play").on("click", function () {
      ap.toggle();
      $("#music-name").html(
        $(".aplayer-title").text() + $(".aplayer-author").text()
      );
    });

    $("#last").on("click", function () {
      ap.skipBack();
      ap.play();
      $("#music-name").html(
        $(".aplayer-title").text() + $(".aplayer-author").text()
      );
    });

    $("#next").on("click", function () {
      ap.skipForward();
      ap.play();
      $("#music-name").html(
        $(".aplayer-title").text() + $(".aplayer-author").text()
      );
    });

    window.onkeydown = function (e) {
      if (e.keyCode == 32) {
        ap.toggle();
      }
    };

    //音量调节
    $("#volume").on("input propertychange touchend", function () {
      let x = $("#volume").val();
      ap.volume(x, true);
      if (x == 0) {
        $("#volume-ico").html("<i class='fa-solid fa-volume-xmark'></i>");
      } else if (x > 0 && x <= 0.3) {
        $("#volume-ico").html("<i class='fa-solid fa-volume-off'></i>");
      } else if (x > 0.3 && x <= 0.6) {
        $("#volume-ico").html("<i class='fa-solid fa-volume-low'></i>");
      } else {
        $("#volume-ico").html("<i class='fa-solid fa-volume-high'></i>");
      }
    });
  },
  error: function () {
    setTimeout(function () {
      iziToast.info({
        timeout: 8000,
        icon: "fa-solid fa-circle-exclamation",
        displayMode: "replace",
        message: "音乐播放器加载失败",
      });
    }, 3800);
  },
});
