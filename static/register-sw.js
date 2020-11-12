
// Ensure that the browser supports the service worker API
if (navigator.serviceWorker) {
	// Start registration process on every page load
	window.addEventListener('load', () =>
	{
		navigator.serviceWorker
			// The register function takes as argument
			// the file path to the worker's file
			.register('/service_worker_2.js', { scope: '/' })
			// Gives us registration object
			.then(reg => console.log('Service Worker Registered'))
			.catch(swErr => console.log(
				`Service Worker Installation Error: ${swErr}}`));
	});
}