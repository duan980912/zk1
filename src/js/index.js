var myswiper = new Swiper(".swiper-container")
$.ajax({
    url: "/api/swiper",
    success: function(data) {
        var data = JSON.parse(data);
        if (data.code === 0) {
            var str = '';
            data.msg.map(function(file) {
                str += `
                <li>
                <div class="left">
                    <h2>${file.tit}</h2>
                    <p>${file.des}</p>
                    <span>${file.time}</span>
                </div>
                <div class="right">
                    <img src="${file.src}" alt="">
                </div>
            </li>
                `
            })
            $(".ulList").html(str);
            var myscroll = new BScroll(".content")
        }
    }
})