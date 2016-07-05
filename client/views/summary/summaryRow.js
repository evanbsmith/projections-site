Template.summaryRow.helpers({
	invoicedTotal: function(){
		var revItems = RevenueInvoiced.find({type:this.line_item_class}).fetch();
		var revTotal = _.reduce(_.pluck(revItems,'amount'),function(a,b){return a + b});
		return accounting.formatMoney(revTotal,"$",0);
	},
	projectedTotal: function(){
		var revItems = RevenueProjections.find({type:this.line_item_class}).fetch();
		console.log(revItems);
		var revTotal = _.reduce(_.pluck(revItems,'amount'),function(a,b){return a + b});
		return accounting.formatMoney(revTotal,"$",0);
	}
});