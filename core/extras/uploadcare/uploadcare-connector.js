/*
	Integrate Uploadcare with Ghost.
*/

//TODO: Make configurable
UPLOADCARE_PUBLIC_KEY = 'demopublickey';
UPLOADCARE_AUTOSTORE = true;

(function() {

	UploadcareConnection = {
		initComponent: function() {
			var widget;
			this._inject("https://ucarecdn.com/widget/1.5.0/uploadcare/uploadcare-1.5.0.js", null);

			// Reapply the listener after it renders //
			Ember.View.reopen({
				didInsertElement : function(){
					this._super();
					Ember.run.scheduleOnce('afterRender', this, this.afterRenderEvent);
				},
				afterRenderEvent : function(){
					if(!widget && uploadcare) {
						widget = uploadcare.Widget(
				            '[role=uploadcare-uploader][data-images-only][data-preview-step][data-crop]'
				        );
					}
					var $btnUploadCare = $("input.uploadcare");
					$btnUploadCare.off('click');
					$btnUploadCare.on('click', function() {
						if (widget) {
							widget.openDialog();
						}
					})
				}
			});
		},
		_inject: function(src) {
			var script = document.createElement('script');
		    script.type = 'text/javascript';
		    script.async = true;
		    script.src = src;
		    if (script) document.getElementsByTagName('head')[0].appendChild(script);
		}
	};
	UploadcareConnection.initComponent();
}());

