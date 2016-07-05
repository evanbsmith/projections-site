Template.summary.helpers({
	invoiced: function(){
		return RevenueInvoiced.find({});
	},
	projected: function(){
		return RevenueProjections.find({});
	},
	invoicedTotal: function(){
		console.log('invoicedTotal test');
		var invoicedItems = RevenueInvoiced.find({}).fetch();
		var invoicedAmounts = _.map(invoicedItems,function(item){
			return item.amount;
		});
		console.log(invoicedAmounts);
		var invoicedTotal = _.reduce(invoicedAmounts,function(prev,current){
			return prev + current;
		},0);
		console.log(invoicedTotal);
		//invoicedItems.reduce(function(prevItem,currentItem,index,array){
		//	console.log('reduce test');
		//	console.log(prevItem);
		//	console.log(currentItem);
		//	console.log(index);
		//	console.log(array);
		//	return prevItem.amount + currentItem.amount;
		//},0);
		return accounting.formatMoney(invoicedTotal,"$",0);
	},
	lineItems: function(){
		return LineItems.find({});
	}
});