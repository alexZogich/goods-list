var app = {
	currentNumber : 0
};

app.genUniqueId = function () {
	// its better to use hash but :-)
	this.currentNumber++;
	return this.currentNumber;
};

app.addGood = function (where,what) {
	var id = app.genUniqueId();
	$(where).append(
		"<li id=" + id + ">" + 
		"<input name='checkGood' type='checkbox' class='checkGood'>" +
		"<span class='goodName'>" + what + 
		"</span><img class='delGood' src='img/del.png' width='15px'></li>"
		);
};

app.delAllChecked = function (where) {
	var allChecked = $(where).find('input[name="checkGood"]:checked');
	allChecked.each( function (i, item) {
		console.log(item);
		$(item).parent().remove();
	});
};

app.checkAll = function (where) {
	var allNotChecked = $(where).find('input[name="checkGood"]:not(:checked)');
	allNotChecked.each( function (i, item) {
		var goodName = $(item).parent().find(".goodName");

		$(item).attr("disabled", true);
		$(item).attr("checked", true);
		goodName.css("text-decoration","line-through");
		goodName.css("opacity","0.5");
	});
};

$(function () {

	$(document).on("click", "#delGoodsBtn", function () {
		app.delAllChecked("#goodsContainer");
	});

	$(document).on("click", "#checkAll", function () {
		$(this).attr("checked", false); // uncheck it in order to have ability to do it again when new items will be added
		app.checkAll("#goodsContainer");
	});

	$("#addGoodInput").keypress( function (e) {

		if (e.keyCode == 13) {
			var inputVal = this.value;

			if (inputVal.length > 14){
				inputVal = inputVal.substring(0,14) + ".."
			}
			$(this).val("");
			app.addGood("#goodsContainer", inputVal);
		}
	});

	$(document).on("click", ".delGood", function () {
		var parent = $(this).parent();
		parent.remove();
	});

	$(document).on("mouseover", "li", function () {
		var li = $(this);
		li.find(".delGood").css("display","block");
	});

	$(document).on("mouseout", "li", function () {
		var li = $(this);
		li.find(".delGood").css("display","none");
	});

	$(document).on("dblclick", ".goodName", function () {
		var goodName = $(this);
		var tempVal = goodName.text();

		goodName.text("");
		var newInput = $("<input type='text'>").appendTo(this).focus();
	
		$(newInput).keyup( function (e) {
			if (e.keyCode == 13) {
				goodName.text(this.value);
				newInput.remove();
			} else if (e.keyCode == 27) {
				goodName.text(tempVal);
				newInput.remove();
			} 
		});
	});

	$(document).on("click", ".checkGood", function () {
		var check = $(this);
		var goodName = check.parent().find(".goodName");
		
		check.attr("disabled", true);
		goodName.css("text-decoration","line-through");
		goodName.css("opacity","0.5");


	});
})
	



