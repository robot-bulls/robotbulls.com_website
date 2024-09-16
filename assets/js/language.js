        function setCookie(cname, cvalue, exdays) {
          var d = new Date();
          d.setTime(d.getTime() + (exdays*24*60*60*1000));
          var expires = "expires="+ d.toUTCString();
          document.cookie = cname + "=" + cvalue + ";" + expires + ';path=/;domain=robotbulls.com';
        }
        
        function getCookie(cname) {
          var name = cname + "=";
          var decodedCookie = decodeURIComponent(document.cookie);
          var ca = decodedCookie.split(';');
          for(var i = 0; i <ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == ' ') {
              c = c.substring(1);
            }
            if (c.indexOf(name) == 0) {
              return c.substring(name.length, c.length);
            }
          }
          return "";
        }
    
        var language; 
        function getLanguage() {
            (getCookie("language") == null) ? setLanguage('en') : false;
            $.ajax({ 
            url:  '/languages/' +  getCookie("language") + '.json', 
            dataType: 'json', async: false, dataType: 'json', 
            success: function (lang) { language = lang } });
            
            console.log("language var: " + language);
            console.log("language cookie: " + getCookie("language"));
            if(getCookie("language") == "fr") {
                $(".language_toggle").html("🇫🇷 FR");
            }
            if(getCookie("language") == "en") {
                $(".language_toggle").html("🇺🇸 EN");
            }
        }
                                
        function setLanguage(lang) {
            setCookie("language", lang, 5);
            language = getCookie("language");
            console.log("language setLanguage var: " + language);
            console.log("language setLanguage cookie: " + getCookie("language"));
            console.log("language setLanguage input: " + lang);
            location.reload();
        }
                                
        $(document).ready(function(){
            if(getCookie("language") != null){
                language = getCookie("language");
            } 
            getLanguage();
            
            if(getCookie("language") != null || getCookie("language") == "en") {
                // console.log("language.menu_home2: "+ $('.menu_home').text());
                
                
                $('.menu:eq(0)').find("li:eq(0)").find("a").text(language.menu_home);
                $('.menu:eq(0)').find("li:eq(1)").find("a").text(language.menu_product);
                $('.menu:eq(0)').find("li:eq(2)").find("a").text(language.menu_team);
                $('.menu:eq(0)').find("li:eq(3)").find("a").text(language.menu_about);
                $('.menu:eq(0)').find("li:eq(4)").find("a").text(language.menu_competitions);
                $('.menu:eq(0)').find("li:eq(5)").find("a").text(language.menu_blog);
                $('.menu:eq(0)').find("li:eq(6)").find("a").text(language.menu_contact);
                
                $('#welcome-text').text( language.welcome );
                $('#welcome-text-description').text(language.welcome_text);
                $('#welcome_cta span').text(language.welcome_cta);
                
                $('.welcome_under_text').html(language.welcome_under_text);
                $('.welcome_under_text_cta').text(language.welcome_under_text_cta);
                
                $('.mission_text').text(language.mission_text);
                $('.mission_under_text').text(language.mission_under_text);
                $('.title1').text(language.title1);
                $('.title1_under_text').html( language.title1_under_text );
                $('.title2').text(language.title2);
                $('.title2_under_text').html( language.title2_under_text );
                
                $('.title3').text(language.title3);
                $('.title3_text1').text(language.title3_text1);
                $('.title3_1').text(language.title3_1);
                $('.title3_1_under_text').text(language.title3_1_under_text);
                $('.title3_2').text(language.title3_2);
                $('.title3_2_under_text').text(language.title3_2_under_text);
                $('.title3_3').text(language.title3_3);
                $('.title3_3_under_text').text(language.title3_3_under_text);
                $('.title3_cta').text(language.title3_cta);
                
                $('.title4').text(language.title4);
                $('.title4_under_text').text(language.title4_under_text);
                $('.title4_1').text(language.title4_1);
                $('.title4_1_under_text').text(language.title4_1_under_text);
                $('.title4_2').text(language.title4_2);
                $('.title4_2_under_text').text(language.title4_2_under_text);
                $('.title4_3').text(language.title4_3);
                $('.title4_3_under_text').text(language.title4_3_under_text);
                $('.title4_cta').text(language.title4_cta);
                
                $('.title_supported_by').text(language.title_supported_by);
                $('.title_supported_by_under_text').text(language.title_supported_by_under_text);
                $('.title_supported_by1').text(language.title_supported_by1);
                $('.title_supported_by_under_text1').text(language.title_supported_by_under_text1);
                $('.title_supported_by2').text(language.title_supported_by2);
                $('.title_supported_by_under_text2').text(language.title_supported_by_under_text2);
                
                $('.bank_title').text(language.bank_title);
                $('.bank_title2').text(language.bank_title2);
                
                $('.all_assets_title').text(language.all_assets_title);
                
                $('.chart-data-s2:eq(0)').find("li:eq(0)").find("span:eq(0)").text(language.all_assets_title1);
                $('.chart-data-s2:eq(0)').find("li:eq(0)").find("span:eq(1)").find("span:eq(1)").html(language.all_assets_title1_under_text);
                
                $('.chart-data-s2:eq(0)').find("li:eq(1)").find("span:eq(0)").text(language.all_assets_title2);
                $('.chart-data-s2:eq(0)').find("li:eq(1)").find("span:eq(1)").find("span:eq(1)").html(language.all_assets_title2_under_text);
                
                $('.chart-data-s2:eq(0)').find("li:eq(2)").find("span:eq(0)").text(language.all_assets_title3);
                $('.chart-data-s2:eq(0)').find("li:eq(2)").find("span:eq(1)").find("span:eq(1)").html(language.all_assets_title3_under_text);
                
                $('.chart-data-s2:eq(0)').find("li:eq(3)").find("span:eq(0)").text(language.all_assets_title4);
                $('.chart-data-s2:eq(0)').find("li:eq(3)").find("span:eq(1)").find("span:eq(1)").html(language.all_assets_title4_under_text);
                
                $('.news_under_title').text(language.news_under_title);
                $('.read_all_news').text(language.read_all_news);
                $('.footer_copyright').text(language.footer_copyright);
                $('.footer_address').text(language.footer_address);
                $('.footer_resources').text(language.footer_resources);
                $('.footer_company').text(language.footer_company);
                $('.footer_privacy').text(language.footer_privacy);
                
                $('.menu_home').text(language.menu_home);
                $('.menu_product').text(language.menu_product);
                $('.menu_team').text(language.menu_team);
                $('.menu_about').text(language.menu_about);
                $('.menu_blog').text(language.menu_blog);
                
                $('.back').text(language.back);
                $('.title_investment_account').text(language.title_investment_account);
                $('.user_dashboard').text(language.user_dashboard);
                $('.title_investment_account_under_text').text(language.title_investment_account_under_text);
                $('.register').text(language.register);
                $('.login_trading').text(language.login_trading);
                $('.title_investment_account_demo').text(language.title_investment_account_demo);
                $('.user_dashboard_demo').text(language.user_dashboard_demo);
                $('.title_investment_account_under_text_demo').text(language.title_investment_account_under_text_demo);
                $('.register_demo').text(language.register_demo);
                $('.account_type_problem').text(language.account_type_problem);
                $('.login_trading_demo').text(language.login_trading_demo);
                
                
                $('.our_product_title').html(language.our_product_title);
                $('.our_product_title_under_text').text(language.our_product_title_under_text);
                $('.our_product_title_cta').text(language.our_product_title_cta);
                $('.our_product_title1').text(language.our_product_title1);
                $('.our_product_title1_under_text').text(language.our_product_title1_under_text);
                $('.our_product_title2').text(language.our_product_title2);
                $('.our_product_title2_under_text').text(language.our_product_title2_under_text);
                $('.our_product_title2_under_text2').text(language.our_product_title2_under_text2);
                $('.our_product_title3').text(language.our_product_title3);
                $('.our_product_title3_under_text').text(language.our_product_title3_under_text);
                $('.our_product_title3_1').text(language.our_product_title3_1);
                $('.our_product_title3_1_under_text').text(language.our_product_title3_1_under_text);
                $('.our_product_title3_2').text(language.our_product_title3_2);
                $('.our_product_title3_2_under_text').text(language.our_product_title3_2_under_text);
                $('.our_product_title3_3').text(language.our_product_title3_3);
                $('.our_product_title3_3_under_text').text(language.our_product_title3_3_under_text);
                $('.our_product_title3_cta').text(language.our_product_title3_cta);
                $('.our_product_title4').text(language.our_product_title4);
                $('.our_product_title4_under_text').text(language.our_product_title4_under_text);
                $('.our_product_title4_li').html(language.our_product_title4_li);
                $('.our_product_title5').text(language.our_product_title5);
                $('.our_product_title5_under_text').text(language.our_product_title5_under_text);
                $('.our_product_title5_li').html(language.our_product_title5_li);
                $('.our_product_title5_cta').text(language.our_product_title5_cta);
                
                $('.team_title').text(language.team_title);
                $('.team_title_career').text(language.team_title_career);
                $('.team_title_internships').text(language.team_title_internships);
                
                $('.current_openings').text(language.current_openings);
                $('.current_openings_under_text').text(language.current_openings_under_text);
                $('.team_bottom_title').text(language.team_bottom_title);
                $('.team_bottom_title1').text(language.team_bottom_title1);
                $('.team_bottom_title1_under_text').text(language.team_bottom_title1_under_text);
                $('.team_bottom_title1_cta').text(language.team_bottom_title1_cta);
                $('.team_bottom_title2').text(language.team_bottom_title2);
                $('.team_bottom_title2_under_text').text(language.team_bottom_title2_under_text);
                $('.team_bottom_title2_cta').text(language.team_bottom_title2_cta);
                
                $('.internship_title').text(language.internship_title);
                $('.internship_title_under_text1').text(language.internship_title_under_text1);
                $('.internship_title_under_text2').text(language.internship_title_under_text2);
                $('.internship_title1').text(language.internship_title1);
                $('.internship_title1_under_text1').text(language.internship_title1_under_text1);
                $('.internship_title1_under_text2').text(language.internship_title1_under_text2);
                $('.internship_title2').text(language.internship_title2);
                $('.internship_title2_under_text1').text(language.internship_title2_under_text1);
                $('.internship_title2_under_text2').text(language.internship_title2_under_text2);
                
                $('.about_title').text(language.about_title);
                $('.about_title_under_text').text(language.about_title_under_text);
                $('.about_behind_the_idea').text(language.about_behind_the_idea);
                $('.about_the_founder').text(language.about_the_founder);
                $('.about_the_founder_small_desription').text(language.about_the_founder_small_desription);
                $('.dimitrov_description').text(language.dimitrov_description);
                $('.core_team').text(language.core_team);
                $('.victoria_description').text(language.victoria_description);
                $('.robin_description').text(language.robin_description);
                $('.steve_description').text(language.steve_description);
                $('.katherine_description').text(language.katherine_description);
                $('.financial_support').text(language.financial_support);
                $('.social_media_ai_representative').text(language.social_media_ai_representative);
                
                $('.competition_title').text(language.competition_title);
                $('.competition_dates').text(language.competition_dates);
                $('.competition_bar_title1').text(language.competition_bar_title1);
                $('.competition_bar_title2').text(language.competition_bar_title2);
                $('.competition_bar_title3').text(language.competition_bar_title3);
                $('.competition_bar_title4').text(language.competition_bar_title4);
                $('.competition_title_under_text').text(language.competition_title_under_text);
                $('.competition_title1').html(language.competition_title1);
                $('.competition_title2').html(language.competition_title2);
                $('.competition_title3').html(language.competition_title3);
                $('.competition_title4').html(language.competition_title4);
                
                $('.competition_title1_1').text(language.competition_title1_1);
                $('.competition_title1_1_under_text').text(language.competition_title1_1_under_text);
                $('.competition_title1_2_under_text').text(language.competition_title1_2_under_text);
                
                $('.blog_under_text').text(language.blog_under_text);
                
                $('.contact_under_text').text(language.contact_under_text);
                $('.contact_title1').text(language.contact_title1);
                $('.contact_extra_text').text(language.contact_extra_text);
                $('.your_name').text(language.your_name);
                $('.your_email').text(language.your_email);
                $('.your_message').text(language.your_message);
                $('.submit').text(language.submit);
                
                $('.404_title').text(language._title);
                $('.404_under_text').text(language._under_text);
                $('.404_cta').text(language._cta);
                
                $(".privacy_policy_title").html(language.privacy_policy_title);
                $(".privacy_policy").html(language.privacy_policy);
                
                
                $(".video_text_title").text(language.video_text_title);
                $(".video_text").html(language.video_text);
                $(".video_url").attr("href", language.video_url);
                $(".video_img").attr("src", language.image_url);
                $(".app_title").html(language.app_title);
                $(".app_text1").html(language.app_text1);
                $(".app_text2").html(language.app_text2);
                $(".app_list1").html(language.app_list1);
                $(".app_list2").html(language.app_list2);
                $(".app_list3").html(language.app_list3);
                $(".app_list4").html(language.app_list4);
                $(".app_list5").html(language.app_list5);
                $(".app_btn").html(language.app_btn);
                
                $(".graph_title").html(language.graph_title);
                $(".graph_top_text").html(language.graph_top_text);
                $(".expected_profit").html(language.expected_profit);
                $(".enter_amount").html(language.enter_amount);
                $(".3_months").html(language.three_months);
                $(".6_months").html(language.six_months);
                $(".12_months").html(language.twelve_months);
                $(".select_amount").html(language.select_amount);
                $(".min_amount").html(language.min_amount);
                $(".graph_btn").html(language.graph_btn);
                $(".rb_commission").html(language.rb_commission);
                $(".bottom_text_title").html(language.bottom_text_title);
                $(".bottom_text").html(language.bottom_text);
                $(".bottom_text_btn").html(language.bottom_text_btn);
                
                
            }
        });
                            
