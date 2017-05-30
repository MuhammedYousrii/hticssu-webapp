const htiMaterials = function(a, b) {
    var c, d = [],
        e = 0,
        f = 6;
    const g = {
            listBox: $("#materialList"),
            searchBox: $("#search_material"),
            currentPage: $(".current-page"),
            searchButton: $("#material-list-search"),
            categoryListItem: $(".category-menu li"),
            m_access_door: $("#materials-list .materials"),
            pagenationControl: $(".pagenaiton-slider"),
            imageBox: $(".material-describe img"),
            nameBox: $(".material-describe article h4"),
            desBox: $(".material-describe article p")
        },
        h = function() {
            $.getJSON(b.a, {
                type: b.t.hti,
                select: "all"
            }, function(a, b, c) {
                ps.getRequestDetail(a, b, c, function(a, b) {
                    ps.showStatueMessage(a, b)
                })
            }).done(function(a) {
                $.each(a, function(b, c) {
                    var d = '<div class="hti-material-block no-padding col-md-3"><figure class="col-xs-12"><img class="img-responsive" alt="' + a[b].material_name + '-material-img" src="' + a[b].material_image + '"/><figcaption>' + a[b].material_name + '</figcaption><div class="material-describe-con"><p class="material-describe-name"><i class="fa fa-circle" aria-expanded="true"></i> ' + a[b].material_name + '</p><p class="material-describe text-left">' + a[b].material_interface + '</p><a class="btn" role="button"  data-value="' + a[b].material_name + '" data-m-img="' + a[b].material_image + '" data-m-des="' + a[b].material_describe + '">View</a></div></figure></div>';
                    $("#home-hti-material .ma-con").append(d)
                })
            }).fail(function(a) {
                a ? console.log("We Can't able To Connect With Servers" + a) : 400 == a.statusCode && console.log("We Unable To Fetch Data Form Servers" + a)
            }).complete(function() {
                $(".ma-con").slick({
                    infinite: !0,
                    autoplay: !0,
                    autoplaySpeed: 8e3,
                    centerMode: !0,
                    centerPadding: "100px",
                    dots: !0,
                    slidesToShow: 3,
                    slidesToScroll: 1,
                    arrows: !0,
                    responsive: [{
                        breakpoint: 1024,
                        settings: {
                            slidesToShow: 3,
                            slidesToScroll: 3,
                            infinite: !0,
                            dots: !0
                        }
                    }, {
                        breakpoint: 600,
                        settings: {
                            slidesToShow: 2,
                            slidesToScroll: 2
                        }
                    }, {
                        breakpoint: 480,
                        settings: {
                            slidesToShow: 1,
                            slidesToScroll: 1
                        }
                    }]
                }), $("#home-hti-material").on("click", ".ma-con a", function() {
                    var a = $(this).data("value");
                    ps.goInnerPage(!1, "material-detailed.php?q" + a, null, null)
                })
            })
        },
        i = function() {
            $.getJSON(b.a, {
                type: b.t.hti,
                select: "all"
            }, function(a, b, c) {
                ps.getRequestDetail(a, b, c, function(a, b) {
                    ps.showStatueMessage(a, b)
                })
            }).done(function(a) {
                $.each(a, function(b, c) {
                    var e = (a[b].material_c.split("@"), $("<img/>").addClass("img-responsive").attr({
                            alt: "Image_for_this_material",
                            src: a[b].material_image
                        })),
                        f = $("<figcaption></figcaption>").text(a[b].material_professor),
                        h = $("<span></span>").text("Offerd by  "),
                        i = $("<a></a>").text("New_Start").attr("href", "https://www.facebook.com/profile.php?id=100013092248523&fref=ts"),
                        j = $("<div></div>").append(h).append(i),
                        k = $("<figure></figure>").append(e).append(f).append(j),
                        l = $("<h5></h5>").text(a[b].material_name),
                        m = $("<span></span>").text("Material code is :  "),
                        n = $("<p></p>").text(a[b].material_code),
                        o = $("<div></div>").addClass("material-single-info").append(m).append(n),
                        p = $("<span></span>").text("Units number  :  "),
                        q = $("<p></p>").text(a[b].material_uints),
                        r = $("<div></div>").addClass("material-single-info").append(p).append(q),
                        s = $("<span></span>").text("requierd material  :  "),
                        t = $("<p></p>").text(a[b].material_req),
                        u = $("<div></div>").addClass("material-single-info").append(s).append(t),
                        v = $("<a></a>").addClass("btn").text("material sources").attr({
                            "data-value": a[b].material_name
                        }),
                        w = $("<div></div>").addClass("data").append(l).append(r).append(o).append(u).append(v),
                        x = $("<div></div>").addClass("hti_material_figure col-md-4 col-xs-12 " + a[b].material_c).append(k).append(w),
                        y = $("<option></option>").val(a[b].material_name).text(a[b].material_name);
                    g.listBox.append(y), d.push(x)
                })
            }).fail(function(a) {
                console.error("the Erorr that happendn is  :: " + JSON.stringify(a, !1, 2))
            }).complete(function() {
                function a() {
                    g.m_access_door.children().remove(), g.pagenationControl.show()
                }

                function b(b, h) {
                    var i = b.val();
                    if (null == i || "" == i || "<script>" == i) return toastr.warning("You Choose Wrong Course Or You Didn't type Any thing So We return basicView", "Wrong Choice"), ps.basicView(a, f, d, "materials-list"), !1;
                    for (g.m_access_door.children().remove(), g.pagenationControl.hide(), c = 0; c < e; c++) {
                        var j = $(d[c]),
                            k = j.find("h5").text();
                        i == k && (g.m_access_door.append(j), ps.equalSize("img", ".overlay"))
                    }
                }
                e = d.length, ps.basicView(a, f, d, "materials-list"), ps.pagniation(e, f), $(".pagenaiton-slider li").on("click", function() {
                    var b = $(this).data("page-num");
                    if (0 == b) return ps.basicView(a, f, d, "materials-list");
                    $(this).addClass("active").siblings().removeClass("active").parent().siblings().removeClass("active");
                    var e = $(this).data("start"),
                        h = $(this).data("end");
                    for (g.currentPage.text(b), a(), c = e; c < h; c++) {
                        var i = d[c];
                        g.m_access_door.append(i)
                    }
                    ps.equalSize("#events-list .row img", "#events-list .row .overlay")
                }), g.categoryListItem.on("click", function() {
                    var b = $(this).data("filter");
                    if ("all" == b) return ps.basicView(a, f, d, "materials-list"), !1;
                    if ("collapse" == b) return !1;
                    for ($(this).addClass("active").siblings("li").removeClass("active"), g.m_access_door.children().remove(), g.pagenationControl.hide(), $("#courseList").children().remove(), c = 0; c < e; c++) {
                        var h = $(d[c]);
                        h.hasClass(b) && g.m_access_door.append(h)
                    }
                    ps.equalSize("#courses-list .row img", "#courses-list .row .overlay")
                }), g.searchBox.on({
                    focus: function() {
                        toastr.info("Write Name Of Course then press enter or Click on button to get result", "tip")
                    },
                    keydown: function(a) {
                        if (16 == a.keyCode) return b(g.searchBox, g.m_access_door), !0
                    }
                }), g.searchButton.on("click", function(a) {
                    a.preventDefault(), b(g.searchBox, g.m_access_door)
                }), g.m_access_door.on("click", ".hti_material_figure a", function() {
                    var a = $(this).data("value");
                    ps.goInnerPage(!1, "material-detailed.php?q=" + a, a, null)
                })
            })
        },
        j = function() {
            var a = document.getElementsByClassName("show-case");
            for (var b in a) {
                var c = a[b].childNodes,
                    d = c[3];
                if(d.childNodes.length <= 1){
                    d.innerHTML = "<li class='source-list-item'> ----No Materials avaliable to showen here</li></br><p>If you 've Any Materials That will Help other students at this field...</p><p>Please uplode here right now!</p> ";
                }
            }
        };
    return a.AddingMaterial = function(a, b) {
        var c = a.serialize();
        b.preventDefault(), $.post("http://hticssu.com/php/add_material.php", c, function(data, statue, xhr) {
            ps.getRequestDetail(data, statue, xhr, function(successMessage, errorMessage) {
                ps.showStatueMessage(successMessage, errorMessage);
            })
        }).done(function(data) {
            if (data == "empty"){
                swal('OOOOOps' , "You Didn't Pass Any Value to Proccess" , 'error');
            }else if (data == 'invalid'){
                swal('OOOOHh!' , "you Pass Danger Data ,, inValid Url Try again" , 'error');
            }else {
                swal("Great Job !!", data, "success")
            }
        }).fail(function(error) {
            swal("OOOOPss!", error, "error")
        })
    }, a.dyniamcResponse = function() {
        if ("/" == b.c || "/index.html" == b.c) h();
        else if ("/material.html" == b.c) i();
        else {
            if ("/material-detailed.php" != b.c) return !1;
            j()
        }
    }, a
}(window.htiMaterials || {}, golpes);
htiMaterials.dyniamcResponse();