sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/m/MessageBox",
	"sap/ui/model/json/JSONModel",
	"sap/ui/core/routing/History"
], function (Controller, MessageBox, JSONModel, History) {
	"use strict";
	return Controller.extend("sap.training.odatatest1.controller.addProductForm", {
		/**
		 * Called when a controller is instantiated and its View controls (if available) are already created.
		 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
		 * @memberOf sap.training.odatatest1.view.addProductForm
		 */
		onInit: function () {},
		/**
		 *@memberOf sap.training.odatatest1.controller.addProductForm
		 */

		addProduct: function (evt) {
			var newID = this.getView().byId("newProductId").getValue();
			var newName = this.getView().byId("newName").getValue();
			var newDescription = this.getView().byId("newDescription").getValue();
			var newRating = this.getView().byId("newRating").getValue();
			var newPrice = this.getView().byId("newPrice").getValue();

			var urlParameters = {};
			urlParameters.ID = parseInt(newID, 10);
			urlParameters.Name = newName;
			urlParameters.Description = newDescription;
			urlParameters.Rating = parseInt(newRating, 10);
			urlParameters.Price = newPrice;

			var oModel = this.getView().getModel();
			oModel.create("/Products", urlParameters, {
				success: function (data) {
					sap.m.MessageBox.show("Created sucseccfully!");
				},
				error: function (e) {
					sap.m.MessageBox.show("Error");
				}
			});
		},

		/**
		 *@memberOf sap.training.odatatest1.controller.addProductForm
		 */
		action: function (oEvent) {
			var that = this;
			var actionParameters = JSON.parse(oEvent.getSource().data("wiring").replace(/'/g, "\""));
			var eventType = oEvent.getId();
			var aTargets = actionParameters[eventType].targets || [];
			aTargets.forEach(function (oTarget) {
				var oControl = that.byId(oTarget.id);
				if (oControl) {
					var oParams = {};
					for (var prop in oTarget.parameters) {
						oParams[prop] = oEvent.getParameter(oTarget.parameters[prop]);
					}
					oControl[oTarget.action](oParams);
				}
			});
			var oNavigation = actionParameters[eventType].navigation;
			if (oNavigation) {
				var oParams = {};
				(oNavigation.keys || []).forEach(function (prop) {
					oParams[prop.name] = encodeURIComponent(JSON.stringify({
						value: oEvent.getSource().getBindingContext(oNavigation.model).getProperty(prop.name),
						type: prop.type
					}));
				});
				if (Object.getOwnPropertyNames(oParams).length !== 0) {
					this.getOwnerComponent().getRouter().navTo(oNavigation.routeName, oParams);
				} else {
					this.getOwnerComponent().getRouter().navTo(oNavigation.routeName);
				}
			}
		}
	});
});