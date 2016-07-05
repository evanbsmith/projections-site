Template.registerHelper('formatMoney', function(number){
	return accounting.formatMoney(number,"$",2);
});

Template.registerHelper('formatDate', function(dateValue){
	return moment(dateValue).format("ha, MMM D YY");
});