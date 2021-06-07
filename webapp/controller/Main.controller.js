sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel"
], function (Controller, JSONModel) {
	"use strict";
	var ListController = Controller.extend("sap.m.sample.ListNavType.List", {
		onInit: function (evt) {}
			/**
			 *@memberOf sap.training.productlist.controller.Main
			 */
			,
		/**
		 *@memberOf sap.training.odatatest1.controller.Main
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
		},
		/**
		 *@memberOf sap.training.odatatest1.controller.Main
		 */
		goToDetailsView: function (evt) {
		var selectProduct = evt.getSource().getBindingContext().getProperty("ID");
		// Now Get the Router Info
		var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
		oRouter.navTo("ProductDetails", { SelectedItem: selectProduct});
		}
	});
	return ListController;
});