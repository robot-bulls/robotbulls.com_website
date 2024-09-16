/*! TokenLite v1.1.7 | Copyright by Softnio. */
function trim_number(e) {
    if (e - Math.floor(e) != 0) {
        for (var t = e.split("."), n = t[0], a = "", o = t[1].split(""), i = !0, r = o.length - 1; r >= 0; r--) {
            var l = o[r];
            "0" == l ? 1 == i && (l = "") : i = !1, a = l + a
        }
        return "" == a ? $.number(n, decimals.max, ".", "") : n + "." + a
    }
    return $.number(e, 0, ".", "")
}

function token_pay(e) {
    return $(e).val() ? $(e).val() : base_currency
}

function token_alert(e, t, n = "") {
    t = void 0 === t ? "" : t;
    if ("icon" !== n)
        if ("token" !== n) {
            if ("amount" !== n) return "text" === n ? (e.find(".note-text-alert").html(t), void e.find(".note-text-alert").addClass("text-danger")) : void e.html(trim_number(t));
            //            e.find(".min-amount").text(t)
        } else e.find(".min-token").text(t);
    else e.find(".note-icon").html('<i class="fas fa-' + t + '"></i>')
}

function token_bonus(e, t = "total") {
    var n, a = e ? parseFloat(e) : 0,
        o = 0,
        i = t || "total",
        r = 0,
        l = base_bonus ? parseFloat(base_bonus) : 0,
        s = amount_bonus || {
            1: 0
        };
    for (n in s) r = a >= (n = parseInt(n)) ? parseFloat(s[n]) : r;
    var m = a * l / 100,
        d = a * r / 100;
    return o = m + d, "base" !== i && "amount" !== i || (o = "base" === i ? m : d), o = isNaN(o) || void 0 === o ? 0 : trim_number($.number(o, 0, ".", ""))
}

function token_calc(e) {
    var t, n, a, o = $(e),
        i = ".token-number",
        r = ".pay-amount",
        l = o.parents(".token-purchase"),
        s = l.find(".final-pay"),
        m = l.find(".pay-currency"),
        d = l.find(".tokens-bonuses"),
        u = l.find(".tokens-bonuses-sale"),
        c = l.find(".tokens-bonuses-amount"),
        _ = l.find(".tokens-total"),
        f = l.find(".pay-method:checked"),
        p = l.find(".token-note"),
        h = $(".payment-btn"),
        v = $("#data_amount"),
        g = $("#data_currency"),
        k = $(".modal-payment"),
        b = k.find(".final-pay"),
        y = k.find(".pay-currency"),
        w = k.find(".token-bonuses"),
        x = k.find(".token-total"),
        F = k.find("input#pay_currency"),
        C = k.find(".gateway-name"),
        N = k.find("input#token_amount"),
        S = isNaN(parseFloat(o.val())) ? 0 : parseFloat(o.val()),
        D = token_pay(f),
        j = token_price[D],
        O = 1,
        I = token_price.base,
        z = minimum_token * j,
        T = 0;
    o.is(i) && (O = S, I = trim_number($.number(S * j, decimals.max, ".", "")), $(r).val(parseFloat(I)), $(r + "-u").text(parseFloat(I))), o.is(r) && (I = S, O = trim_number($.number(S / j, decimals.min, ".", "")), $(i).val(parseFloat(O)), $(i + "-u").text(parseFloat(O))), 0 === O ? (token_alert(p, "info-circle", "icon"), h.addClass("disabled").removeAttr("data-amount")) : O >= minimum_token && O <= maximum_token ? (token_alert(p, "check-circle text-success", "icon"), token_alert(p, I * minimum_token, "amount"), token_alert(p, "", "text"), h.removeClass("disabled").addClass("active-btn")) : O < minimum_token ? (token_alert(p, "times-circle text-danger", "icon"), h.addClass("disabled").removeAttr("data-amount")) : O > maximum_token && (token_alert(p, "The Investment limit for the selected plan is $" + maximum_token + ".", "text"), h.addClass("disabled").removeAttr("data-amount")), t = parseFloat(token_bonus(O, "base")), n = parseFloat(token_bonus(O, "amount")), a = parseFloat(token_bonus(O, "total")), T = parseFloat(O) + a, I = isNaN(I) ? 0 : I, T = isNaN(T) ? 0 : T;
    var A = trim_number($.number(T, decimals.min, ".", ""));
    token_alert(p, trim_number($.number(z, decimals.max, ".", "")), "amount"), m.text(D), d.text(a), u.text(t), c.text(n), s.text(trim_number($.number(I, decimals.max, ".", ""))), _.text(A), b.text(trim_number($.number(I, decimals.max, ".", ""))), y.text(D), w.text(a), x.text(A), F.val(D), N.val(O), "btc" != D && "usd" != D && "usd" != D || C.text('"Coingate"'), "usd" != D && "eur" != D && "gbp" != D || C.text('"Paypal"');
    var L = amount_bonus || {
        1: 0
    };
    for (_t in L) _t = parseInt(_t), O >= _t ? $(".bonus-tire-" + L[_t]).addClass("active") : $(".bonus-tire-" + L[_t]).removeClass("active");
    v.val(O), g.val(D), address_btn(g.val(), minimum_token, maximum_token, O)
}

function address_btn(e, t, n, a) {
    "usd" == e.toLowerCase() || "gbp" == e.toLowerCase() || "eur" == e.toLowerCase() || (Number(a) >= Number(t) && Number(a) <= Number(n) ? $("a.payment-btn.offline_payment").removeClass("disabled") : $("a.offline_payment").addClass("disabled"))
}

function purchase_form_submit(e = $(".validate-form"), t = !0, n = "ti ti-info-alt") {
    e.validate({
        errorClass: "text-danger border-danger error",
        submitHandler: function (a) {
            $(a).ajaxSubmit({
                dataType: "json",
                success: function (o) {
                    if (btn_actived(e.find("button.save-disabled"), !1), o.trnx || show_toast(o.msg, o.message, n), "success" == o.msg || !0 === t && $(a).clearForm(), o.link && setTimeout(function () {
                            window.location.href = o.link
                        }, 2e3), o.modal) {
                        var i = e.parents(".modal"),
                            r = !0;
                        is_changed = !0, i.modal("hide").addClass("hold"), i.find(".modal-content").html(o.modal), init_inside_modal(), i.on("hidden.bs.modal", function () {
                            1 == r ? (i.modal("show"), r = !1) : i.modal("hide")
                        })
                    }
                },
                error: function (e, t, a) {
                    e.responseJSON.length > 0 ? cl(e.responseJSON.exception + "\n" + e.responseJSON.message) : cl(e), show_toast("warning", "Something is Wrong!\n(" + (null != a ? a : "API Issue") + ")", n), cl("Ajax Error!!")
                }
            })
        },
        invalidHandler: function (e, t) {}
    })
}! function (e) {
    "use strict";
    var t = e("#ajax-modal"),
        n = e("#nio-user-personal, #nio-user-settings, #nio-user-password");
    n.length > 0 && ajax_form_submit(n, !1);
    var a = e("form#user_wallet_update");
    a.length > 0 && ajax_form_submit(a, !1);
    var o = e("#activity_action").val();
    e(".activity-delete").length > 0 && e(document).on("click", ".activity-delete", function () {
        swal({
            title: "Are you sure?",
            text: "Once Deleted, You will not be able to get the data back.",
            icon: "warning",
            buttons: !0,
            dangerMode: !0
        }).then(t => {
            if (t) {
                var n = e(this).data("id");
                e.post(o, {
                    _token: csrf_token,
                    delete_activity: n
                }).done(t => {
                    cl(t), "success" == t.msg && ("all" == n ? e("#activity-log tr").fadeOut(1e3, function () {
                        e(this).remove(), e("#activity-log").hide()
                    }) : e(".activity-delete").parents("tr.activity-" + n).fadeOut(1e3, function () {
                        e(this).remove()
                    }))
                }).fail(function (e, t, n) {
                    show_toast("error", "Something is wrong!\n" + n), _log(e, t, n)
                })
            }
        })
    });
    var i = e(".document-type");
    i.length > 0 && i.on("click", function () {
        var t = e(this).data("title"),
            n = e(".doc-upload-d2"),
            a = void 0 !== e(this).data("change"),
            o = e(this).data("img");
        e(".doc-type-name").text(t), e("._image").attr("src", o), n.length > 0 && a ? n.removeClass("hide") : n.addClass("hide")
    });
    var r = e("form#kyc_submit");
    if (r.length > 0 && ajax_form_submit(r, !1), e(".upload-zone").length > 0) {
        Dropzone.autoDiscover = !1;
        var l = e("input#file_uploads").val(),
            s = e('meta[name="csrf-token"]').attr("content");
        if (e(".document_one").length > 0) {
            var m = new Dropzone(".document_one", {
                url: l,
                uploadMultiple: !1,
                maxFilesize: 5.1,
                maxFiles: 1,
                addRemoveLinks: !0,
                acceptedFiles: "image/jpeg,image/png,application/pdf",
                hiddenInputContainer: ".hiddenFiles",
                paramName: "kyc_file_upload",
                headers: {
                    "X-CSRF-TOKEN": s
                }
            });
            m.on("sending", function (e, t, n) {
                n.append("docType", "doc-one")
            }).on("success", function (t, n) {
                cl(n);
                var a = n.message;
                "error" == n.msg ? (alert(a), m.removeFile(t)) : e('input[name="document_one"]').val(n.file_name)
            }).on("removedfile", function (t) {
                var n = e('input[name="document_one"]').val();
                n.length > 0 && e.post(l, {
                    _token: csrf_token,
                    action: "delete",
                    file: n
                }).done(t => {
                    cl(t), e('input[name="document_one"]').val("")
                })
            })
        }
        if (e(".document_two").length > 0) {
            var d = new Dropzone(".document_two", {
                url: l,
                uploadMultiple: !1,
                maxFilesize: 5.1,
                maxFiles: 1,
                addRemoveLinks: !0,
                acceptedFiles: "image/jpeg,image/png,application/pdf",
                hiddenInputContainer: ".hiddenFiles",
                paramName: "kyc_file_upload",
                headers: {
                    "X-CSRF-TOKEN": s
                }
            });
            d.on("sending", function (e, t, n) {
                n.append("docType", "doc-two")
            }).on("success", function (t, n) {
                cl(n);
                var a = n.message;
                "error" == n.msg ? (alert(a), d.removeFile(t)) : e('input[name="document_two"]').val(n.file_name)
            }).on("removedfile", function (t) {
                var n = e('input[name="document_two"]').val();
                n.length > 0 && e.post(l, {
                    _token: csrf_token,
                    action: "delete",
                    file: n
                }).done(t => {
                    cl(t), e('input[name="document_two"]').val("")
                })
            })
        }
        if (e(".document_upload_hand").length > 0) {
            var u = new Dropzone(".document_upload_hand", {
                url: l,
                uploadMultiple: !1,
                maxFilesize: 5.1,
                maxFiles: 1,
                addRemoveLinks: !0,
                acceptedFiles: "image/jpeg,image/png,application/pdf",
                hiddenInputContainer: ".hiddenFiles",
                paramName: "kyc_file_upload",
                headers: {
                    "X-CSRF-TOKEN": s
                }
            });
            u.on("sending", function (e, t, n) {
                n.append("docType", "doc-hand")
            }).on("success", function (t, n) {
                cl(n);
                var a = n.message;
                "error" == n.msg ? (alert(a), u.removeFile(t)) : e('input[name="document_image_hand"]').val(n.file_name)
            }).on("removedfile", function (t) {
                var n = e('input[name="document_image_hand"]').val();
                n.length > 0 && e.post(l, {
                    _token: csrf_token,
                    action: "delete",
                    file: n
                }).done(t => {
                    cl(t), e('input[name="document_image_hand"]').val("")
                })
            })
        }
    }
    var c = e(".token-number"),
        _ = e(".pay-amount"),
        f = e(".pay-method");
    c.numericInput({
        allowFloat: !1
    }), _.numericInput({
        allowFloat: !0
    }), c.add(_).on("keyup", function () {
        token_calc(this)
    }), f.on("change", function () {
        token_calc(c)
    });
    var p = e("form#offline_payment");
    p.length > 0 && purchase_form_submit(p, !1);
    var h = !1;
    e(".modal-close").on("click", function (t) {
        t.preventDefault(), !0 === h ? confirm("Do you really cancel your order?") && (bs_modal_hide(e(this)), h = !1) : bs_modal_hide(e(this))
    });
    var v = e(".token-payment-btn"),
        g = e("#payment-modal"),
        k = e("#data_amount"),
        b = e("#data_currency"),
        plan = e("#data_currency");
    g = e("#payment-modal");
    v.on("click", function (t) {
        t.preventDefault();
        var n = e(this),
            a = n.data("type") ? n.data("type") : "offline",
            //            o = k.val(),
            o = k.val(),
            //            i = b.val();
            i = "usd";
        console.log(n.attr("plan"));
        o == o ? e.post(access_url, {
            _token: csrf_token,
            req_type: a,
            //            min_token: minimum_token,
            token_amount: o,
            currency: i
        }).done(t => {
            g.find(".modal-content").html(t.modal), init_inside_modal(), g.modal("show"), console.log("test end xx"), e("#offline_payment").length > 0 && purchase_form_submit(e("#offline_payment")), o = i = "";

            //            if (n.attr("plan") == "3m") {
            //                g.find(".lead_plan_text").html("Please enter an amount between <strong>$500</strong> and <strong>$2000</strong> for the <strong>3 month plan</strong>.");
            //                $("#token-number").attr("min", "500").attr("max", "2000");
            //                console.log("3 finished")
            //            } else if (n.attr("plan") == "6m") {
            //                g.find(".lead_plan_text").html("Please enter an amount between <strong>$2000</strong> and <strong>$5000</strong> for the <strong>6 month plan</strong>.");
            //                $("#token-number").attr("min", "2000").attr("max", "5000");
            //                console.log("6 finished")
            //            } else if (n.attr("plan") == "12m") {
            //                g.find(".lead_plan_text").html("Please enter an amount starting at <strong>$5000</strong> for the <strong>12 month plan</strong>.");
            //                $("#token-number").attr("min", "5000").removeAttr("max");
            //                console.log("12 finished")
            //            }

        }).fail(function (e, t, n) {
            show_toast("error", "Something is wrong!\n" + n), _log(e, t, n)
        }) : (o = k.val(), i = "usd", show_toast("warning", "Something is wrong! - If the error persists, please contact support."))
    }), e("a.user-wallet").on("click", function (n) {
        n.preventDefault(), user_wallet_address.length > 5 && e.post(user_wallet_address, {
            _token: csrf_token
        }).done(e => {
            cl(e), t.html(e), init_inside_modal(), t.children(".modal").length > 0 && t.children(".modal").modal("show")
        }).fail(function (e, t, n) {
            show_toast("error", "Something is wrong!\n" + n), _log(e, t, n)
        })
    });
    e(document).on("click", ".investment-button", function (n) {
        console.log("click on invest");
        console.log($("#token-number").val());
        //        o = "120";
        o = $("#token-number").val();
        console.log("o = " + o);

        o == o ? e.post(access_url, {
            _token: csrf_token,
            req_type: a,
            //            min_token: minimum_token,
            token_amount: o,
            currency: i
        }).done(t => {

        }).fail(function (e, t, n) {

        }) : (o = "120", i = "usd", show_toast("warning", "Something is wrong! - If the error persists, please contact support."))
    });

    e(document).on("click", "a.view-transaction", function (n) {
        n.preventDefault();
        var a = e(this).data("id");
        e.post(view_transaction_url, {
            tnx_id: a,
            _token: csrf_token
        }).done(e => {
            cl(e), t.html(e), t.children(".modal").length > 0 && t.children(".modal").modal("show")
        }).fail(function (e, t, n) {
            show_toast("error", "Something is wrong!\n" + n), _log(e, t, n)
        })
    });
    e(document).on("click", "a.user-modal-request", function (n) {
        n.preventDefault();
        var a = null,
            o = e(this).data("action"),
            i = e(this).data("type") ? e(this).data("type") : "";
        "send-token" == o && "undefined" != typeof user_token_send ? a = user_token_send : "withdraw-token" == o && "undefined" != typeof user_token_withdraw && (a = user_token_withdraw), null !== a && i ? e.post(a, {
            type: i
        }).done(function (e) {
            if (void 0 !== e.modal) t.html(e.modal), init_inside_modal(), t.children(".modal").length > 0 && t.children(".modal").modal("show");
            else if (e.message) {
                var n = e.icon ? e.icon : "ti ti-info-alt";
                show_toast(e.msg, e.message, n)
            }
        }).fail(function (e, t, n) {
            show_toast("error", "Something is wrong!\n" + n), _log(e, t, n)
        }) : show_toast("warning", "Unable process request!", "ti ti-info-alt")
    });





    function createCookie(name, value, days) {
        var expires;
        if (days) {
            var date = new Date();
            date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
            expires = "; expires=" + date.toGMTString();
        } else {
            expires = "";
        }
        document.cookie = escape(name) + "=" + escape(value) + expires + "; path=/";
    }

    function removeAllClasses() {
        $("#conclusion_name").removeClass("badge-light");
        $("#conclusion_name").removeClass("badge-danger");
        $("#conclusion_name").removeClass("badge-info");
        $("#conclusion_name").removeClass("badge-secondary");
        $("#conclusion_name").removeClass("badge-warning");
        $("#conclusion_name").removeClass("badge-success");
    }

    var duration = "3 months";
    var plan = "General Bull";
    var amount = "between $500 and $2000";
    var amount_numb = "$500-$2000";
    var risk = "20%";
    var roi = "22.5%";
    
    $(".token-payment-btn-general-bull").click(function() {
        createCookie("amount", $("#token-number-general-bull").val(), 10);
        console.log($("#token-number-general-bull").val());
        createCookie("stripeToken", $("#token-number-general-bull").val(), 10);
        console.log("token-number-general-bull" + $("#token-number-general-bull").val());
    });
    
    $(".token-payment-btn-stocks-bull").click(function() {
        createCookie("amount", $("#token-number-stocks-bull").val(), 10);
        console.log($("#token-number-stocks-bull").val());
        createCookie("stripeToken", $("#token-number-stocks-bull").val(), 10);
        console.log("token-number-stocks-bull" + $("#token-number-stocks-bull").val());
    });
    
    $(".token-payment-btn-crypto-bull").click(function() {
        createCookie("amount", $("#token-number-crypto-bull").val(), 10);
        console.log($("#token-number-crypto-bull").val());
        createCookie("stripeToken", $("#token-number-crypto-bull").val(), 10);
        console.log("token-number-crypto-bull" + $("#token-number-crypto-bull").val());
    });
    
    $(".token-payment-btn-real_estate-bull").click(function() {
        createCookie("amount", $("#token-number-real_estate-bull").val(), 10);
        console.log($("#token-number-real_estate-bull").val());
        createCookie("stripeToken", $("#token-number-real_estate-bull").val(), 10);
        console.log("token-number-real_estate-bull" + $("#token-number-real_estate-bull").val());
    });
    
    $(".token-payment-btn-green_bonds-bull").click(function() {
        createCookie("amount", $("#token-number-green_bonds-bull").val(), 10);
        console.log($("#token-number-green_bonds-bull").val());
        createCookie("stripeToken", $("#token-number-green_bonds-bull").val(), 10);
        console.log("token-number-green_bonds-bull" + $("#token-number-green_bonds-bull").val());
    });
    
    $(".token-payment-btn-ipo-bull").click(function() {
        createCookie("amount", $("#token-number-ipo-bull").val(), 10);
        console.log($("#token-number-ipo-bull").val());
        createCookie("stripeToken", $("#token-number-ipo-bull").val(), 10);
        console.log("token-number-ipo-bull" + $("#token-number-ipo-bull").val());
    });
    
    // $(".payment-btn").click(function() {
    //     createCookie("stripeToken", $("#token-number").val(), 10);
    //     console.log("token-number" + $("#token-number").val());
    // });
        
    $(document).on('input', '.slider', function() {
        // $('#slider_value').html( $(this).val() );
        // $(this).html( $(this).val() );
        
        console.log("id" + this.id);
        
        var ret = this.id.replace('slider','');
        var slider_text_class = ".slider-text" + ret;
        console.log(slider_text_class);
        
        if ($(this).val() == 1) {
            createCookie("duration", "3 Month", 10);
            console.log("3 Months");
            // $(slider_text_class).html("3 Months");
            // minimum_token = 500;
            // maximum_token = 2000;
        }
        if ($(this).val() == 2) {
            createCookie("duration", "6 Month", 10);
            console.log("6 Months");
            // $(slider_text_class).html("6 Months");
            // minimum_token = 2000;
            // maximum_token = 5000;
        }
        if ($(this).val() == 3) {
            createCookie("duration", "12 Month", 10);
            console.log("12 Months");
            // $(slider_text_class).html("12 Months");
            // minimum_token = 5000;
            // maximum_token = 1000000000000;
        }
        
    });

    // $(".token-payment-btn").click(function() {
    //     createCookie("amount", $("#token-number").val(), 10);
    //     console.log($("#token-number").val());
    // });
        
    e(document).on("click", ".duration-item", function (n) {

        if (e(this).find("label").attr("for") == "3m") {
            duration = "3 months";
            // minimum_token = 500;
            // maximum_token = 1000000;
            amount = "between $500 and $2000";
            amount_numb = "$500-$2000";
            createCookie("duration", "3 Month", 10);
            
            $(".gb_price").html(amount_numb);
            $(".hrb_price").html(amount_numb);
            $(".s_price").html(amount_numb);
            $(".c_price").html(amount_numb);
            $(".real_estate_price").html(amount_numb);
            $(".green_bonds_price").html(amount_numb);
            
            $(".gb_risk").html("6.7%");
            $(".hrb_risk").html("20%");
            $(".s_risk").html("13.3%");
            $(".c_risk").html("13.4%");
            $(".real_estate_risk").html("13.4%");
            $(".green_bonds_risk").html("10.6%");
            
            $(".gb_roi").html("7.5%");
            $(".hrb_roi").html("20.5%");
            $(".s_roi").html("13.9%");
            $(".c_roi").html("15.4%");
            $(".real_estate_roi").html("13.5%");
            $(".green_bonds_roi").html("12.3%");
            
        }
        if (e(this).find("label").attr("for") == "6m") {
            duration = "6 months";
            // minimum_token = 2000;
            // maximum_token = 5000;
            amount = "between $2000 and $5000";
            amount_numb = "$2000-$5000";
            createCookie("duration", "3 Month", 10);
            
            $(".gb_price").html(amount_numb);
            $(".hrb_price").html(amount_numb);
            $(".s_price").html(amount_numb);
            $(".c_price").html(amount_numb);
            $(".real_estate_price").html(amount_numb);
            $(".green_bonds_price").html(amount_numb);
            
            $(".gb_risk").html("13.4%");
            $(".hrb_risk").html("40%");
            $(".s_risk").html("26.6%");
            $(".c_risk").html("26.8%");
            $(".real_estate_risk").html("26.8%");
            $(".green_bonds_risk").html("21.2%");
            
            $(".gb_roi").html("15%");
            $(".hrb_roi").html("41%");
            $(".s_roi").html("27.8%");
            $(".c_roi").html("30.8%");
            $(".real_estate_roi").html("27%");
            $(".green_bonds_roi").html("24.6%");
        }
        if (e(this).find("label").attr("for") == "12m") {
            duration = "12 months";
            // minimum_token = 5000;
            // maximum_token = 1000000000;
            amount = "starting at $5000";
            amount_numb = "+$5000";
            createCookie("duration", "3 Month", 10);
            
            $(".gb_price").html(amount_numb);
            $(".hrb_price").html(amount_numb);
            $(".s_price").html(amount_numb);
            $(".c_price").html(amount_numb);
            $(".real_estate_price").html(amount_numb);
            $(".green_bonds_price").html(amount_numb);
            
            $(".gb_risk").html("20%");
            $(".hrb_risk").html("60%");
            $(".s_risk").html("40%");
            $(".c_risk").html("40%");
            $(".real_estate_risk").html("40%");
            $(".green_bonds_risk").html("32%");
            
            $(".gb_roi").html("22.5%");
            $(".hrb_roi").html("61.5%");
            $(".s_roi").html("41.7%");
            $(".c_roi").html("46.4%");
            $(".real_estate_roi").html("40.7%");
            $(".green_bonds_roi").html("36.7%");
        }
        
        if (plan == "General Bull") {
                risk = $(".gb_risk").html();
                roi = $(".gb_roi").html();
            }
            if (plan == "High Risk Bull") {
                risk = $(".hrb_risk").html();
                roi = $(".hrb_roi").html();
            }
            if (plan == "Stocks Bull") {
                risk = $(".s_risk").html();
                roi = $(".s_roi").html();
            }
            if (plan == "Crypto Bull") {
                risk = $(".c_risk").html();
                roi = $(".c_roi").html();
            }
            if (plan == "Real Estate Bull") {
                risk = $(".real_estate_risk").html();
                roi = $(".real_estate_roi").html();
            }
            if (plan == "Grern Bonds Bull") {
                risk = $(".green_bonds_risk").html();
                roi = $(".green_bonds_roi").html();
            }

        $("#token-number").attr("min", "100").attr("max", "1000000");
        $(".card-text_child").html("Your current plan supports transactions " + amount + ". The investment is managed by our trading robot for " + duration + ", unless you decide to make changes to the duration. The plan risks " + risk + " of the transaction. No more than this amount will be at risk for your investment. No action is required from your side until the end of the period. After that, your money will be returned with an expected return of " + roi + ".");
        $("#conclusion_name").html(plan);
        $("#conclusion_amount").html(amount_numb);
        $("#conclusion_risk").html(risk);
        $("#conclusion_roi").html(roi);

    });

    e(document).on("click", ".payment-item", function (n) {


        if (e(this).find("label").attr("for") == "general_bull") {
            plan = "General Bull";
            risk = $(".gb_risk").html();
            roi = $(".gb_roi").html();
            removeAllClasses();
            $("#conclusion_name").addClass("badge-light");
            createCookie("plan", "General Bull", 10);
        }
        if (e(this).find("label").attr("for") == "high_risk_bull") {
            plan = "High Risk Bull";
            risk = $(".hrb_risk").html();
            roi = $(".hrb_roi").html();
            removeAllClasses();
            $("#conclusion_name").addClass("badge-danger");
            createCookie("plan", "High Risk Bull", 10);
        }
        if (e(this).find("label").attr("for") == "stocks_bull") {
            plan = "Stocks Bull";
            risk = $(".s_risk").html();
            roi = $(".s_roi").html();
            removeAllClasses();
            $("#conclusion_name").addClass("badge-info");
            createCookie("plan", "Stocks Bull", 10);
        }
        if (e(this).find("label").attr("for") == "crypto_bull") {
            plan = "Crypto Bull";
            risk = $(".c_risk").html();
            roi = $(".c_roi").html();
            removeAllClasses();
            $("#conclusion_name").addClass("badge-secondary");
            createCookie("plan", "Crypto Bull", 10);
        }
        if (e(this).find("label").attr("for") == "real_estate_bull") {
            plan = "Real Estate Bull";
            risk = $(".real_estate_risk").html();
            roi = $(".real_estate_roi").html();
            removeAllClasses();
            $("#conclusion_name").addClass("badge-warning");
            createCookie("plan", "Real Estate Bull", 10);
        }
        if (e(this).find("label").attr("for") == "green_bonds_bull") {
            plan = "Green Bonds Bull";
            risk = $(".green_bonds_risk").html();
            roi = $(".green_bonds_roi").html();
            removeAllClasses();
            $("#conclusion_name").addClass("badge-success");
            createCookie("plan", "Green Bonds Bull", 10);
        }

        $("#token-number").attr("min", "100").attr("max", "1000000");
        $(".card-text_child").html("Your current plan supports transactions " + amount + ". The investment is managed by our trading robot for " + duration + ", unless you decide to make changes to the duration. The plan risks " + risk + " of the transaction. No more than this amount will be at risk for your investment. No action is required from your side until the end of the period. After that, your money will be returned with an expected return of " + roi + ".");
        $("#conclusion_name").html(plan);
        $("#conclusion_amount").html(amount_numb);
        $("#conclusion_risk").html(risk);
        $("#conclusion_roi").html(roi);

    });

    e(document).on("click", ".activate-robot", function (n) {
        console.log("click on btn");

        //        $("#active_robot_title").html("Loading");
        $("#active_robot_text").html("Initiating process");
        $("#active_robot_text_container").append("<div class='dot-elastic'></div>");
        $("#active_robot_button").css("display", "none");

        setTimeout(function () {
            $("#active_robot_text").html("Finding Wallet");
        }, 2000);

    });

    e(document).on("click", ".robot_slider", function (n) {

        console.log($(".robot_slider").attr("value"));

        //        var robot_slider = $(".robot_slider").attr("value");

        //        if(robot_slider == "0") {
        //            $(".robot_slider").attr("value", "1");
        //            console.log($(".robot_slider").attr("value"));
        //        }
        //        
        //        if(robot_slider == "1") {
        //            $(".robot_slider").attr("value", "0");
        //            console.log($(".robot_slider").attr("value"));
        //        }

    });

    $(document).ready(function () {
        createCookie("duration", "3 Month", 10);
        createCookie("plan", "General Bull", 10);

        var minimum_token = 100;
        var maximum_token = 1000000;
        console.log($("#kyc_opt_hide").attr("value"));
        
        var account_equity = parseInt($("#account_equity").html()).toFixed(6);
        
        $("#account_equity").html(account_equity);
        
        //        console.log( "ready!" );
        //        console.log( $("#active_robot_title").attr("robot") );

        //        $("#active_robot_title").attr()

        //        if (active_robot == "active") {

        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = today.getFullYear();

        today = mm + '/' + dd + '/' + yyyy;
        $("#dashboard_date").html(today);

        if ($("#active_robot_title").attr("robot") == "1" && parseInt($("#active_robot_title").attr("equity")) > 0) {

            var initial_balance = $("#account_equity").html();
            initial_balance = parseFloat(initial_balance.replace(/,/g, ''));
            //        console.log( initial_balance );

            //            var precision = 1000000; // 2 decimals
            var max = 0.000998;
            var min = 0.000008;
            var randomnum = (Math.random() * (max - min) + min).toFixed(6);
            var end_num = randomnum;
            //            console.log(initial_balance);
            //            console.log(randomnum);
            //            console.log(end_num);
            //            console.log(initial_balance + end_num);
            //            console.log(+initial_balance + +end_num);
            //            console.log(parseInt(initial_balance) + parseInt(end_num)).toFixed(6);
            //            console.log(parseInt(initial_balance) + end_num).toFixed(6);
            //            console.log(initial_balance + parseInt(end_num)).toFixed(6);
            //            console.log(initial_balance + parseInt(end_num)).toFixed(6);

            $("#account_equity").html(+initial_balance + +end_num);

            var new_balance = $("#account_equity").html();

            //        setInterval(function() {
            //            
            //            var new_balance = $("#account_balance").html();
            //
            //             precision = 1000000; // 2 decimals
            //             randomnum = Math.floor(Math.random() * (400 * precision - 1 * precision) + 1 * precision) / (1*precision);
            //                end_num = randomnum - 200;
            //                
            //             $("#account_balance").html(parseInt(initial_balance) + end_num);
            //
            //             console.log(parseInt(initial_balance) + end_num);
            //             console.log(end_num);
            //
            //        }, Math.random() * (4000 - 1000) + 1000);

            var new_number;

            setInterval(function () {
                var element = document.getElementById('account_equity');
                //                precision = 1000000; // 2 decimals
                new_number = +(Math.random() * (max - min) + min).toFixed(6);
                //                console.log(new_number);
                updateNumber(
                    // parseInt(element.innerHTML, 10) + 10000 + Math.floor(100 * Math.random()) - 100,
                    // element

                    (initial_balance + (new_number)), element);
            }, Math.random() * (15000 - 5000) + 5000);


            function updateNumber(newNumber, element) {
                var initialClassName = element.className;
                element.className += ' ticker-animation';

                var framesPerSecond = 10;
                var millisecondsPerFrame = 2000 / framesPerSecond;
                var currentNumber = parseInt(element.innerHTML, 10);
                var difference = newNumber - currentNumber;
                var numberPerFrame = difference / framesPerSecond;
                var currentFrame = 1;

                var increment = function () {
                    currentNumber += numberPerFrame;

                    if (++currentFrame === framesPerSecond) {
                        element.className = initialClassName;
                        currentNumber = newNumber;
                    }


                    element.innerHTML = parseFloat(currentNumber).toFixed(6);
                };

                for (var i = 0; i < framesPerSecond; i++) {
                    setTimeout(increment, millisecondsPerFrame * i);
                }
            }

        }

    });

    e(document).on("click", "a.user_tnx_trash", function (t) {
        t.preventDefault();
        var n = e(this).data("tnx_id"),
            a = e(this).attr("href");
        confirm("Are you sure?") && e.post(a, {
            tnx_id: n,
            _token: csrf_token
        }).done(t => {
            cl(t), e("tr.tnx-item-" + n).fadeOut(400, function () {
                e(this).remove()
            }), cl(n), show_toast(t.msg, t.message, "ti ti-trash")
        }).fail(function (e, t, n) {
            show_toast("error", "Something is wrong!\n" + n), _log(e, t, n)
        })
    })
}(jQuery);
