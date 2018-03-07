webpackJsonp([0x89644e1deba5],{384:function(n,a){n.exports={data:{post:{html:'<h1 id="authentication-support"><a href="#authentication-support" aria-hidden="true" class="anchor"><svg aria-hidden="true" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg></a>Authentication Support</h1>\n<p>Authentication can easily be handled when using the API Platform\'s admin library.\nIn the following section, we will assume <a href="https://api-platform.com/docs/core/jwt" target="_blank" rel="nofollow noopener noreferrer">the API is secured using JWT</a>, but the\nprocess is similar for other authentication mechanisms. The <code>login_uri</code> is the full URI to the route specified by the <code>firewalls.login.json_login.check_path</code> config in the <a href="https://api-platform.com/docs/core/jwt" target="_blank" rel="nofollow noopener noreferrer">JWT documentation</a>.</p>\n<p>The first step is to create a client to handle the authentication process:</p>\n<div class="gatsby-highlight">\n      <pre class="language-javascript"><code><span class="token comment">// src/authClient.js</span>\n<span class="token keyword">import</span> <span class="token punctuation">{</span> AUTH_LOGIN<span class="token punctuation">,</span> AUTH_LOGOUT<span class="token punctuation">,</span> AUTH_ERROR<span class="token punctuation">,</span> AUTH_CHECK <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">\'admin-on-rest\'</span><span class="token punctuation">;</span>\n\n<span class="token comment">// Change this to be your own login check route.</span>\n<span class="token keyword">const</span> login_uri <span class="token operator">=</span> <span class="token string">\'https://demo.api-platform.com/login_check\'</span><span class="token punctuation">;</span>\n\n<span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token punctuation">(</span>type<span class="token punctuation">,</span> params<span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>\n  <span class="token keyword">switch</span> <span class="token punctuation">(</span>type<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token keyword">case</span> AUTH_LOGIN<span class="token punctuation">:</span>\n      <span class="token keyword">const</span> <span class="token punctuation">{</span> username<span class="token punctuation">,</span> password <span class="token punctuation">}</span> <span class="token operator">=</span> params<span class="token punctuation">;</span>\n      <span class="token keyword">const</span> request <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Request</span><span class="token punctuation">(</span><span class="token template-string"><span class="token string">`</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span>login_uri<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">`</span></span><span class="token punctuation">,</span> <span class="token punctuation">{</span>\n        method<span class="token punctuation">:</span> <span class="token string">\'POST\'</span><span class="token punctuation">,</span>\n        body<span class="token punctuation">:</span> JSON<span class="token punctuation">.</span><span class="token function">stringify</span><span class="token punctuation">(</span><span class="token punctuation">{</span> email<span class="token punctuation">:</span> username<span class="token punctuation">,</span> password <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">,</span>\n        headers<span class="token punctuation">:</span> <span class="token keyword">new</span> <span class="token class-name">Headers</span><span class="token punctuation">(</span><span class="token punctuation">{</span> <span class="token string">\'Content-Type\'</span><span class="token punctuation">:</span> <span class="token string">\'application/json\'</span> <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">,</span>\n      <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n      <span class="token keyword">return</span> <span class="token function">fetch</span><span class="token punctuation">(</span>request<span class="token punctuation">)</span>\n        <span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span>response <span class="token operator">=></span> <span class="token punctuation">{</span>\n          <span class="token keyword">if</span> <span class="token punctuation">(</span>response<span class="token punctuation">.</span>status <span class="token operator">&lt;</span> <span class="token number">200</span> <span class="token operator">||</span> response<span class="token punctuation">.</span>status <span class="token operator">>=</span> <span class="token number">300</span><span class="token punctuation">)</span> <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token class-name">Error</span><span class="token punctuation">(</span>response<span class="token punctuation">.</span>statusText<span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n          <span class="token keyword">return</span> response<span class="token punctuation">.</span><span class="token function">json</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n        <span class="token punctuation">}</span><span class="token punctuation">)</span>\n        <span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">{</span> token <span class="token punctuation">}</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>\n          localStorage<span class="token punctuation">.</span><span class="token function">setItem</span><span class="token punctuation">(</span><span class="token string">\'token\'</span><span class="token punctuation">,</span> token<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// The JWT token is stored in the browser\'s local storage</span>\n          window<span class="token punctuation">.</span>location<span class="token punctuation">.</span><span class="token function">replace</span><span class="token punctuation">(</span><span class="token string">\'/\'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n        <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n    <span class="token keyword">case</span> AUTH_LOGOUT<span class="token punctuation">:</span>\n      localStorage<span class="token punctuation">.</span><span class="token function">removeItem</span><span class="token punctuation">(</span><span class="token string">\'token\'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n      <span class="token keyword">break</span><span class="token punctuation">;</span>\n\n    <span class="token keyword">case</span> AUTH_ERROR<span class="token punctuation">:</span>\n      <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token number">401</span> <span class="token operator">===</span> params<span class="token punctuation">.</span>status <span class="token operator">||</span> <span class="token number">403</span> <span class="token operator">===</span> params<span class="token punctuation">.</span>status<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n        localStorage<span class="token punctuation">.</span><span class="token function">removeItem</span><span class="token punctuation">(</span><span class="token string">\'token\'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n        <span class="token keyword">return</span> Promise<span class="token punctuation">.</span><span class="token function">reject</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n      <span class="token punctuation">}</span>\n      <span class="token keyword">break</span><span class="token punctuation">;</span>\n\n    <span class="token keyword">case</span> AUTH_CHECK<span class="token punctuation">:</span>\n      <span class="token keyword">return</span> localStorage<span class="token punctuation">.</span><span class="token function">getItem</span><span class="token punctuation">(</span><span class="token string">\'token\'</span><span class="token punctuation">)</span> <span class="token operator">?</span> Promise<span class="token punctuation">.</span><span class="token function">resolve</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">:</span> Promise<span class="token punctuation">.</span><span class="token function">reject</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n      <span class="token keyword">default</span><span class="token punctuation">:</span>\n          <span class="token keyword">return</span> Promise<span class="token punctuation">.</span><span class="token function">resolve</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n  <span class="token punctuation">}</span>\n<span class="token punctuation">}</span>\n</code></pre>\n      </div>\n<p>Then, configure the <code>Admin</code> component to use the authentication client we just created:</p>\n<div class="gatsby-highlight">\n      <pre class="language-javascript"><code><span class="token keyword">import</span> React <span class="token keyword">from</span> <span class="token string">\'react\'</span><span class="token punctuation">;</span>\n<span class="token keyword">import</span> parseHydraDocumentation <span class="token keyword">from</span> <span class="token string">\'@api-platform/api-doc-parser/lib/hydra/parseHydraDocumentation\'</span><span class="token punctuation">;</span>\n<span class="token keyword">import</span> <span class="token punctuation">{</span> HydraAdmin<span class="token punctuation">,</span> hydraClient<span class="token punctuation">,</span> fetchHydra <span class="token keyword">as</span> baseFetchHydra <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">\'@api-platform/admin\'</span><span class="token punctuation">;</span>\n<span class="token keyword">import</span> authClient <span class="token keyword">from</span> <span class="token string">\'./authClient\'</span><span class="token punctuation">;</span>\n<span class="token keyword">import</span> <span class="token punctuation">{</span> Redirect <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">\'react-router-dom\'</span><span class="token punctuation">;</span>\n\n<span class="token keyword">const</span> entrypoint <span class="token operator">=</span> <span class="token string">\'https://demo.api-platform.com\'</span><span class="token punctuation">;</span> <span class="token comment">// Change this by your own entrypoint</span>\n<span class="token keyword">const</span> fetchHeaders <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token string">\'Authorization\'</span><span class="token punctuation">:</span> <span class="token template-string"><span class="token string">`Bearer </span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span>window<span class="token punctuation">.</span>localStorage<span class="token punctuation">.</span><span class="token function">getItem</span><span class="token punctuation">(</span><span class="token string">\'token\'</span><span class="token punctuation">)</span><span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">`</span></span><span class="token punctuation">}</span><span class="token punctuation">;</span>\n<span class="token keyword">const</span> <span class="token function-variable function">fetchHydra</span> <span class="token operator">=</span> <span class="token punctuation">(</span>url<span class="token punctuation">,</span> options <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token function">baseFetchHydra</span><span class="token punctuation">(</span>url<span class="token punctuation">,</span> <span class="token punctuation">{</span>\n    <span class="token operator">...</span>options<span class="token punctuation">,</span>\n    headers<span class="token punctuation">:</span> <span class="token keyword">new</span> <span class="token class-name">Headers</span><span class="token punctuation">(</span>fetchHeaders<span class="token punctuation">)</span><span class="token punctuation">,</span>\n<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token keyword">const</span> <span class="token function-variable function">restClient</span> <span class="token operator">=</span> api <span class="token operator">=></span> <span class="token function">hydraClient</span><span class="token punctuation">(</span>api<span class="token punctuation">,</span> fetchHydra<span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token keyword">const</span> <span class="token function-variable function">apiDocumentationParser</span> <span class="token operator">=</span> entrypoint <span class="token operator">=></span> <span class="token function">parseHydraDocumentation</span><span class="token punctuation">(</span>entrypoint<span class="token punctuation">,</span> <span class="token punctuation">{</span> headers<span class="token punctuation">:</span> <span class="token keyword">new</span> <span class="token class-name">Headers</span><span class="token punctuation">(</span>fetchHeaders<span class="token punctuation">)</span> <span class="token punctuation">}</span><span class="token punctuation">)</span>\n    <span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span>\n        <span class="token punctuation">(</span><span class="token punctuation">{</span> api <span class="token punctuation">}</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">(</span><span class="token punctuation">{</span> api <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">,</span>\n        <span class="token punctuation">(</span>result<span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>\n            <span class="token keyword">switch</span> <span class="token punctuation">(</span>result<span class="token punctuation">.</span>status<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n                <span class="token keyword">case</span> <span class="token number">401</span><span class="token punctuation">:</span>\n                    <span class="token keyword">return</span> Promise<span class="token punctuation">.</span><span class="token function">resolve</span><span class="token punctuation">(</span><span class="token punctuation">{</span>\n                        api<span class="token punctuation">:</span> result<span class="token punctuation">.</span>api<span class="token punctuation">,</span>\n                        customRoutes<span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token punctuation">{</span>\n                            props<span class="token punctuation">:</span> <span class="token punctuation">{</span>\n                                path<span class="token punctuation">:</span> <span class="token string">\'/\'</span><span class="token punctuation">,</span>\n                                render<span class="token punctuation">:</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token operator">&lt;</span>Redirect to<span class="token operator">=</span><span class="token punctuation">{</span><span class="token template-string"><span class="token string">`/login`</span></span><span class="token punctuation">}</span><span class="token operator">/</span><span class="token operator">></span><span class="token punctuation">,</span>\n                            <span class="token punctuation">}</span><span class="token punctuation">,</span>\n                        <span class="token punctuation">}</span><span class="token punctuation">]</span><span class="token punctuation">,</span>\n                    <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n                <span class="token keyword">default</span><span class="token punctuation">:</span>\n                    <span class="token keyword">return</span> Promise<span class="token punctuation">.</span><span class="token function">reject</span><span class="token punctuation">(</span>result<span class="token punctuation">)</span><span class="token punctuation">;</span>\n            <span class="token punctuation">}</span>\n        <span class="token punctuation">}</span><span class="token punctuation">,</span>\n    <span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n<span class="token keyword">export</span> <span class="token keyword">default</span> props <span class="token operator">=></span> <span class="token punctuation">(</span>\n    <span class="token operator">&lt;</span>HydraAdmin\n        apiDocumentationParser<span class="token operator">=</span><span class="token punctuation">{</span>apiDocumentationParser<span class="token punctuation">}</span>\n        authClient<span class="token operator">=</span><span class="token punctuation">{</span>authClient<span class="token punctuation">}</span>\n        entrypoint<span class="token operator">=</span><span class="token punctuation">{</span>entrypoint<span class="token punctuation">}</span>\n        restClient<span class="token operator">=</span><span class="token punctuation">{</span>restClient<span class="token punctuation">}</span>\n    <span class="token operator">/</span><span class="token operator">></span>\n<span class="token punctuation">)</span><span class="token punctuation">;</span>\n</code></pre>\n      </div>\n<p>Refer to <a href="https://marmelab.com/admin-on-rest/Authentication.html" target="_blank" rel="nofollow noopener noreferrer">the chapter dedicated to authentication in the Admin On Rest documentation</a>\nfor more information.</p>'},navDoc:{edges:[{node:{title:"The Distribution",path:"distribution",items:[{id:"index",title:"Creating a Fully Featured API in 5 Minutes",anchors:null},{id:"testing",title:"Testing and Specifying the API",anchors:null}]}},{node:{title:"The API Component",path:"core",items:[{id:"index",title:"Introduction",anchors:null},{id:"getting-started",title:"Getting Started",anchors:[{id:"installing-api-platform-core",title:"Installing API Platform Core"},{id:"before-reading-this-documentation",title:"Before Reading this Documentation"},{id:"mapping-the-entities",title:"Mapping the Entities"}]},{id:"configuration",title:"Configuration",anchors:null},{id:"operations",title:"Operations",anchors:[{id:"enabling-and-disabling-operations",title:"Enabling and Disabling Operations"},{id:"configuring-operations",title:"Configuring Operations"},{id:"subresources",title:"Subresources"},{id:"creating-custom-operations-and-controllers",title:"Creating Custom Operations and Controllers"}]},{id:"default-order",title:"Overriding Default Order",anchors:null},{id:"filters",title:"Filters",anchors:[{id:"doctrine-orm-filters",title:"Doctrine ORM Filters"},{id:"serializer-filters",title:"Serializer Filters"},{id:"creating-custom-filters",title:"Creating Custom Filters"},{id:"apifilter-annotation",title:"ApiFilter Annotation"}]},{id:"serialization",title:"The Serialization Process",anchors:[{id:"overall-process",title:"Overall Process"},{id:"available-serializers",title:"Available Serializers"},{id:"the-serialization-context-groups-and-relations",title:"The Serialization Context, Groups and Relations"},{id:"using-serialization-groups",title:"Using Serialization Groups"},{id:"using-different-serialization-groups-per-operation",title:"Using Different Serialization Groups per Operation"},{id:"changing-the-serialization-context-dynamically",title:"Changing the Serialization Context Dynamically"},{id:"changing-the-serialization-context-on-a-per-item-basis",title:"Changing the Serialization Context on a Per Item Basis"},{id:"name-conversion",title:"Name Conversion"},{id:"decorating-a-serializer-and-add-extra-data",title:"Decorating a Serializer and Add Extra Data"},{id:"entity-identifier-case",title:"Entity Identifier Case"},{id:"embedding-the-json-ld-context",title:"Embedding the JSON-LD Context"}]},{id:"validation",title:"Validation",anchors:[{id:"using-validation-groups",title:"Using Validation Groups"},{id:"dynamic-validation-groups",title:"Dynamic Validation Groups"},{id:"error-levels-and-payload-serialization",title:"Error Levels and Payload Serialization"}]},{id:"errors",title:"Error Handling",anchors:[{id:"converting-php-exceptions-to-http-errors",title:"Converting PHP Exceptions to HTTP Errors"}]},{id:"pagination",title:"Pagination",anchors:[{id:"disabling-the-pagination",title:"Disabling the Pagination"},{id:"changing-the-number-of-items-per-page",title:"Changing the Number of Items per Page"},{id:"partial-pagination",title:"Partial Pagination"}]},{id:"events",title:"The Event System",anchors:null},{id:"content-negotiation",title:"Content Negotiation",anchors:[{id:"enabling-several-formats",title:"Enabling Several Formats"},{id:"registering-a-custom-serializer",title:"Registering a Custom Serializer"},{id:"creating-a-responder",title:"Creating a Responder"},{id:"writing-a-custom-normalizer",title:"Writing a Custom Normalizer"}]},{id:"external-vocabularies",title:"Using External JSON-LD Vocabularies",anchors:null},{id:"extending-jsonld-context",title:"Extending JSON-LD context",anchors:null},{id:"data-providers",title:"Data Providers",anchors:[{id:"custom-collection-data-provider",title:"Custom Collection Data Provider"},{id:"custom-item-data-provider",title:"Custom Item Data Provider"},{id:"injecting-the-serializer-in-an-itemdataprovider",title:'Injecting the Serializer in an "ItemDataProvider"'}]},{id:"extensions",title:"Extensions",anchors:[{id:"custom-extension",title:"Custom Extension"},{id:"example",title:"Filter upon the current user"}]},{id:"security",title:"Security",anchors:null},{id:"performance",title:"Performance",anchors:[{id:"enabling-the-builtin-http-cache-invalidation-system",title:"Enabling the Builtin HTTP Cache Invalidation System"},{id:"enabling-the-metadata-cache",title:"Enabling the Metadata Cache"},{id:"using-ppm-php-pm",title:"Using PPM (PHP-PM)"},{id:"doctrine-queries-and-indexes",title:"Doctrine Queries and Indexes"}]},{id:"operation-path-naming",title:"Operation Path Naming",anchors:[{id:"configuration",title:"Configuration"},{id:"create-a-custom-operation-path-resolver",title:"Create a Custom Operation Path Naming"}]},{id:"form-data",title:"Accept application/x-www-form-urlencoded Form Data",anchors:null},{id:"fosuser-bundle",title:"FOSUserBundle Integration",anchors:[{id:"installing-the-bundle",title:"Installing the Bundle"},{id:"enabling-the-bridge",title:"Enabling the Bridge"},{id:"creating-a-user-entity-with-serialization-groups",title:'Creating a "User" Entity with Serialization Groups'}]},{id:"jwt",title:"Adding a JWT authentication using LexikJWTAuthenticationBundle",anchors:[{id:"testing-with-swagger",title:"Testing with Swagger"},{id:"testing-with-behat",title:"Testing with Behat"}]},{id:"nelmio-api-doc",title:"NelmioApiDocBundle integration",anchors:null},{id:"angularjs-integration",title:"AngularJS Integration",anchors:[{id:"restangular",title:"Restangular"},{id:"ng-admin",title:"ng-admin"}]},{id:"swagger",title:"Swagger Support",anchors:[{id:"override-swagger-documentation",title:"Override Swagger documentation"}]},{id:"graphql",title:"GraphQL Support",anchors:[{id:"overall-view",title:"Overall View"},{id:"enabling-graphql",title:"Enabling GraphQL"},{id:"graphiql",title:"GraphiQL"}]},{id:"serialization",title:"The Serialization Process",anchors:[{id:"overall-process",title:"Overall Process"},{id:"available-serializers",title:"Available Serializers"},{id:"decorating-a-serializer-and-add-extra-data",title:"Decorating a Serializer and Add Extra Data"}]},{id:"dto",title:"Handling Data Transfer Objects (DTOs)",anchors:null}]}},{node:{title:"The Schema Generator Component",path:"schema-generator",items:[{id:"index",title:"Introduction",anchors:null},{id:"getting-started",title:"Getting Started",anchors:null},{id:"configuration",title:"Configuration",anchors:null}]}},{node:{title:"The Admin Component",path:"admin",items:[{id:"index",title:"Introduction",anchors:[{id:"features",title:"Features"}]},{id:"getting-started",title:"Getting Started",anchors:[{id:"installation",title:"Installation"},{id:"creating-the-admin",title:"Creating the Admin"},{id:"customizing-the-admin",title:"Customizing the Admin"}]},{id:"authentication-support",title:"Authentication Support",anchors:null},{id:"handling-relations-to-collections",title:"Handling Relations to Collections",anchors:[{id:"using-an-autocomplete-input-for-relations",title:"Using an Autocomplete Input for Relations"}]}]}},{node:{title:"The Client Generator Component",path:"client-generator",items:[{id:"index",title:"Introduction",anchors:[{id:"features",title:"Features"}]},{id:"react",title:"React generator",anchors:null},{id:"vuejs",title:"Vue.js generator",anchors:null},{id:"troubleshooting",title:"Troubleshooting",anchors:null}]}},{node:{title:"Deployment",path:"deployment",items:[{id:"index",title:"Introduction",anchors:null},{id:"kubernetes",title:"Deploying to a Kubernetes Cluster",anchors:null},{id:"heroku",title:"Deploying an API Platform App on Heroku",anchors:null}]}},{node:{title:"Extra",path:"extra",items:[{id:"releases",title:"The Release Process",anchors:null},{id:"philosophy",title:"The Project's Philosophy",anchors:null},{id:"troubleshooting",title:"Troubleshooting",anchors:null},{id:"contribution-guides",title:"Contribution Guides",anchors:null},{id:"conduct",title:"Contributor Code Of Conduct",anchors:null}]}}]}},pathContext:{path:"docs/admin/authentication-support",current:{path:"docs/admin/authentication-support",title:"The Admin Component - Authentication Support"},prev:{path:"docs/admin/getting-started",title:"Getting Started",rootPath:"The Admin Component"},next:{path:"docs/admin/handling-relations-to-collections",title:"Handling Relations to Collections",rootPath:"The Admin Component"}}}}});
//# sourceMappingURL=path---docs-admin-authentication-support-970d0f839628215a64a1.js.map