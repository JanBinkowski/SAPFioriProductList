sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/m/MessageBox",
	"sap/ui/model/json/JSONModel",
	"sap/ui/core/routing/History"
], function (Controller, JSONModel, History, MessageBox) {
	"use strict";
	return Controller.extend("sap.training.odatatest1.controller.ProductDetails", {
		/**
		 * Called when a controller is instantiated and its View controls (if available) are already created.
		 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
		 * @memberOf sap.training.odatatest1.view.ProductDetails
		 */
		onInit: function () {
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.getRoute("ProductDetails").attachMatched(this._onRouteFound, this);
		},
		_onRouteFound: function (oEvt) {
				var oArgument = oEvt.getParameter("arguments");
				var oView = this.getView();
				oView.bindElement({
					path: "/Products(" + oArgument.SelectedItem + ")"
				});
			}
			/**
			 * Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
			 * (NOT before the first rendering! onInit() is used for that one!).
			 * @memberOf sap.training.odatatest1.view.ProductDetails
			 */
			//	onBeforeRendering: function() {
			//
			//	},
			/**
			 * Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
			 * This hook is the same one that SAPUI5 controls get after being rendered.
			 * @memberOf sap.training.odatatest1.view.ProductDetails
			 */
			//	onAfterRendering: function() {
			//
			//	},
			/**
			 * Called when the Controller is destroyed. Use this one to free resources and finalize activities.
			 * @memberOf sap.training.odatatest1.view.ProductDetails
			 */
			//	onExit: function() {
			//
			//	}
			,
		/**
		 *@memberOf sap.training.odatatest1.controller.ProductDetails
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
		 *@memberOf sap.training.odatatest1.controller.ProductDetails
		 */
		onSaveEditedDescripiton: function (oEvent) {
			var ID1 = this.getView().byId("IDDetails").getValue();
			var newDescription1 = this.getView().byId("Description").getValue();
			var oModel = this.getView().getModel();
			var path = "/Products(" + ID1 + ")";
			var urlParameters = {};
			urlParameters.ID = parseInt(ID1, 10);
			urlParameters.Description = newDescription1;
			oModel.update(path, urlParameters, {
				success: function (data) {
					sap.m.MessageBox.show("Updated successfully!");
				},
				error: function (e) {
					sap.m.MessageBox.show("Error");
				}
			});
		},
		/**
		 *@memberOf sap.training.odatatest1.controller.ProductDetails
		 */
		onDeleteProduct: function (oEvent) {
				var ID1 = this.getView().byId("IDDetails").getValue();
				var oModel = this.getView().getModel();
			var path = "/Products(" + ID1 + ")";
		
			oModel.remove(path, {
				success: function (data) {
					sap.m.MessageBox.show("Deleted sucseccfully!");
				},
				error: function (e) {
					sap.m.MessageBox.show("Error");
				}
			});
		}
	});
});