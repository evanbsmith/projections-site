Revenue = new Mongo.Collection('revenue');

Meteor.methods({
	postRevenueAmount: function(revData){
		var now = new Date().valueOf();
		var user = Meteor.user();
		
		if (revData._id === 'none'){
			console.log('add new revItem');
			console.log(revData);
			
			var project = Projects.findOne(revData.project_id);
			var monthRevItems = Revenue.find({
				project_id: project._id,
				month: revData.month
			}).fetch();
			
			var revStatus = 'projected';
			if (monthRevItems.length > 0){
				console.log('other month rev found');
				console.log(monthRevItems);
				var invoicedTest = _.every(monthRevItems,function(item){return item.rev_status === 'invoiced'});
				console.log('invoicedTest: ' + invoicedTest);
				if (invoicedTest){
					revStatus = 'invoiced';
				}
			}
			
			Revenue.insert({
				month: revData.month,
				line_item: revData.line_item,
				project_id: project._id,
				project_code: project.project_code,
				project_name: project.project_name,
				mechanism: project.mechanism,
				contract_type: project.contract_type,
				client: project.client,
				amount: revData.amount,
				updated_on: now,
				updated_by: user,
				rev_status: revStatus,
				rev_history:[]
			},function(error,id){
				ChangeHistory.insert({
					user: user,
					timestamp: now,
					project_id: project._id,
					collection: 'revenue',
					action: 'added',
					item_id: id,
					fieldChanged: 'amount',
					previousValue: 0,
					currentValue: revData.amount
				});
			});
		}
		else {
			console.log('update existing revItem');
			var foundItem = Revenue.findOne(revData._id);
			console.log('foundItem');
			console.log(foundItem);
			
			if (foundItem.amount !== revData.amount){
				Revenue.update(foundItem._id, 
					{
						$set: { 
							amount: revData.amount, 
							updated_on: now, 
							updated_by: user
						}
					}, function(error,id){
						ChangeHistory.insert({
							user: user,
							timestamp: now,
							project_id: revData.project_id,
							collection: 'revenue',
							action: 'updated',
							item_id: id,
							fieldChanged: 'amount',
							previousValue: foundItem.amount,
							curentValue: revData.amount
						});
				});
			}
		}
	},
	updateRevenueStatus: function(parameters){
		var now = new Date().valueOf();
		var user = Meteor.user();
		
		var revItems = Revenue.find({
			project_id: parameters.project_id, 
			month: parameters.month
		});
		
		var prevStatus = revItems.fetch()[0].rev_status;
		
		var idList = revItems.map(function(doc,index,cursor){
			return doc._id;
		});
		
		Revenue.update(
			{project_id: parameters.project_id, month: parameters.month},
			{$set: {rev_status: parameters.newStatus, timestamp: now}},
			{multi: true},
			function(error,numUpdated){
				console.log('updateRevenueStatus callback');
				console.log(numUpdated);
				console.log(idList);
				ChangeHistory.insert({
					user: user,
					timestamp: now,
					project_id: parameters.project_id,
					collection: 'revenue',
					action: 'updated',
					item_id: idList,
					fieldChanged: 'rev_status',
					previousValue: prevStatus,
					currentValue: parameters.newStatus
				});
			}
		);
	}
});