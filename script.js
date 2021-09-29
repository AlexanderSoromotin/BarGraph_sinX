var countColumns = 0;
var x = 0;

var kSin = 0.1;				// Коэффициент синуса
var columnWidth = 20; 		// Ширина колонки (в пикселях)
var columnMargin = 2;		// Отступ между колонками (в пикселях)
var columnHeight = 200;		// Высота колонки (в пикселях)
var intervalDelay = 100;	// Время между появлениями колонок (в миллисекундах)
var	columnsLimit = 200;		// Лимит колонок

function updateValuesSettings () {
	// Обновление настроек.
	columnWidth = Number($('.columnWidth').val());
	columnMargin = Number($('.columnMargin').val());
	// columnHeight = Number($('.columnHeight').val());
	intervalDelay = Number($('.intervalDelay').val());
	kSin = Number($('.kSin').val());
	columnsLimit = Number($('.columnsLimit').val());

	$(".area").css({"height" : columnHeight * 2 + 100})
	$(".area_list_colibration").css({"height" : columnHeight + 50})
	console.log(intervalDelay)
}

function addColumn (type) {
	// Добавление колонны
	if (type == "random") {
		// Мод : рандом
		var height = Math.floor(Math.random() * columnHeight) + 2;
	}
	if (type == "sin") {
		// Мод : sin(x)
		x += kSin;
		height = Math.floor(columnHeight * Math.sin(x));
	}
	
	// считаем порядковый номер колонны
	countColumns++;

	if (height < 0) {
		// Если положительно
		$(".area_list").prepend("<div class='" + countColumns + "' style='height: 0px'></div>");
		height = height * (-1);
		setTimeout(function () {
			$("." + countColumns).css({"height" : height + "px", "width" : columnWidth + "px", "margin" :  "0px " + columnMargin + "px", "transform" : "rotate(180deg)"})
		}, 30);

	} else {
		// Если отрицательно, то переворачиваем колонну, высоту * -1
		$(".area_list").prepend("<div class='" + countColumns + "' style='height: 0px'></div>");
		
		setTimeout(function () {
			$("." + countColumns).css({"height" : height + "px", "width" : columnWidth + "px", "margin" : "0px " + columnMargin + "px"})
		}, 30);
	}
	if (countColumns > columnsLimit) {
		// Лимитируем количество колонн, чтобы снизить нагрузку на браузер
		$("." + (countColumns - columnsLimit)).remove();
	}
}

$(".area").css({"height" : columnHeight * 2 + 100});
$(".area_list_colibration").css({"height" : columnHeight + 50});

var setInterval_sinx = function() {
	// Интервал добавления колонн
	// Сделано так, чтобы была возможность динамически менять время интервала
	addColumn("sin");
    setTimeout(setInterval_sinx, intervalDelay);
}
setInterval_sinx();

// Нажатие на кнопку сохранения
$('.settings_save').click(() => updateValuesSettings())
