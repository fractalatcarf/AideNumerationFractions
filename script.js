            var clicked = false;


            $(function() {
                $(".resizable").data("slice", 1).data("on", 0).resizable({
                    aspectRatio: 1 / 1,
                    maxHeight: 500,
                    maxWidth: 500,
                    minHeight: 200,
                    minWidth: 200,
                    resize: function(event, ui) {
                        $("#cercle2").css("height", ui.size.height);
                        $("#cercle2").css("width", ui.size.width);
                    }
                });


                $("#plus").bind('click', function() {
                    if (clicked) {
                        clicked = false;
                        $("#commands").css({
                            "height": "150px"
                        });
                        $("#commands2").css({
                            "display": "none"
                        });
                        $("#cercle2").css({
                            "display": "none"
                        });
                    } else {
                        clicked = true;
                        $("#commands").css({
                            "height": "300px"
                        });
                        $("#commands2").css({
                            "display": "yes"
                        });
                        $("#cercle2").css({
                            "display": "yes"
                        });
                    }
                });


            });

            $(function() {
                $(".commands").draggable();
                $(".draggable").draggable({
                    drag: function(event, ui) {
                        var c1t = parseInt($("#cercle1").css("top"));
                        var c2t = parseInt($("#cercle2").css("top"));
                        var c1l = parseInt($("#cercle1").css("left"));
                        var c2l = parseInt($("#cercle2").css("left"));
                        if (Math.abs(c1l - c2l) < parseInt($("#cercle2").css("width")) && Math.abs(c1t - c2t) < parseInt($("#cercle2").css("height"))) {
                            $("#cercle2").css("opacity", "0.5");
                        } else {
                            $("#cercle2").css("opacity", "1");
                        }
                    }

                });

            });

            function change1(denom, num) {
                change(denom, num, 1);
            }

            function change(denom, num, rang) {
                var url = "http://chart.apis.google.com/chart?cht=p&chof=gif&chs=540x540&chp=-1.57&chds=a&chd=t:";
                var chco = "&chco=";
                var slice = num;
                $("#denom" + rang).text(denom);
                $("#num" + rang).text(num)
                for (var i = 0; i < denom; i++) {
                    url = url + "1";
                    if (i < slice) {
                        if (rang == 1) {
                            chco = chco + "FF0000";
                        } else {
                            chco = chco + "00FF00";
                        }
                    } else {
                        chco = chco + "cccccc";
                    }
                    if (i < (denom - 1)) {
                        url = url + ",";
                        chco = chco + ",";
                    }
                }
                url = url + chco;
                if (denom > 1) {
                    $("#cercle" + rang).css("background-image", "url(" + url + ")");
                    $("#cercle" + rang).css("background-color", "#cccccc");
                } else {
                    $("#cercle" + rang).css("background-image", "none");
                    if (num == 1) {
                        $("#cercle" + rang).css("background-color", (rang==1)?"red":"#00FF00");
                    } else {
                        $("#cercle" + rang).css("background-color", "#cccccc");
                    }
                }
            }

            $(function() {
                $("#slideDenom1").slider({
                    value: 1,
                    min: 0,
                    max: 20,
                    slide: function(event, ui) {
                        //alert($(this).attr("id") );   
                        var value = ui.value;
                        if (value == 0) return false;
                        //$("#slideNum1").slider("option","max",value);
                        if (value < $("#slideNum1").slider("value")) {
                            $("#slideNum1").slider("option", "value", value)
                        }
                        change1(value, $("#slideNum1").slider("value"));

                    }

                });

                $("#slideNum1").slider({
                    value: 0,
                    min: 0,
                    max: 20,
                    slide: function(event, ui) {
                        //alert($(this).attr("id") );   
                        var value = ui.value;
                        if (value > $("#slideDenom1").slider("value")) return false;
                        if (value > 0) {
                            // change display
                            $("#num1").css("color", "red");
                            $("#score1>hr").css("background-color", "black")
                        } else {
                            $("#num1").css("color", "rgba(255,255,255, 0)");
                            $("#score1>hr").css("background-color", "rgba(255,255,255, 0)")
                        }
                        change1($("#slideDenom1").slider("value"), value);
                    }

                });

                $("#slideDenom2").slider({
                    value: 1,
                    min: 0,
                    max: 20,
                    slide: function(event, ui) {
                        //alert($(this).attr("id") );   
                        var value = ui.value;
                        if (value == 0) return false;
                        //$("#slideNum1").slider("option","max",value);
                        if (value < $("#slideNum2").slider("value")) {
                            $("#slideNum2").slider("option", "value", value)
                        }
                        change(value, $("#slideNum2").slider("value"), 2);

                    }

                });

                $("#slideNum2").slider({
                    value: 0,
                    min: 0,
                    max: 20,
                    slide: function(event, ui) {
                        //alert($(this).attr("id") );   
                        var value = ui.value;
                        if (value > $("#slideDenom2").slider("value")) return false;
                        if (value > 0) {
                            // change display
                            $("#num2").css("color", "green");
                            $("#score2>hr").css("background-color", "black")
                        } else {
                            $("#num2").css("color", "rgba(255,255,255, 0)");
                            $("#score2>hr").css("background-color", "rgba(255,255,255, 0)")
                        }
                        change($("#slideDenom2").slider("value"), value, 2);
                    }

                });



            });
