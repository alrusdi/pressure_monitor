const updateMeasurementValue = (el, maxValue) => {
    var value = parseInt(el.text());
    console.log(el, value, maxValue);
    el.removeClass("pressure-record-value-danger");
    if (value > maxValue) {
        el.addClass("pressure-record-value-danger");
        return true;
    }
    return false;
};

const redrawTable = () => {
  var targetTopValue = parseInt(jQuery("#input-max-top-pressure").val());
  var targetBottomValue = parseInt(jQuery("#input-max-bottom-pressure").val());
  jQuery(".pressure-measurement").each(function () {
      var dayHasDangerValues = false;
      jQuery(this).find(".pressure-record-values").each(function (item) {
          var valueDiv = jQuery(this);
          var isTopValueDanger = updateMeasurementValue(valueDiv.find(".pressure-record-value-top"), targetTopValue);
          var isBottomValueDanger = updateMeasurementValue(valueDiv.find(".pressure-record-value-bottom"), targetBottomValue);
          if (isBottomValueDanger || isTopValueDanger) {
              dayHasDangerValues = true;
          }
      });
      var dayDiv = jQuery(this).find(".pressure-day");
      dayDiv.removeClass("pressure-day-danger");
      if (dayHasDangerValues) {
          dayDiv.addClass("pressure-day-danger")
      }
  })
};

jQuery(() => {
   redrawTable();
   jQuery("#filter-form").on("change", "#input-max-top-pressure,#input-max-bottom-pressure", redrawTable);
});