webpackJsonp([52407257572089],{420:function(e,t){e.exports={data:{post:{html:'<h1 id="deploying-to-a-kubernetes-cluster"><a href="#deploying-to-a-kubernetes-cluster" aria-hidden="true" class="anchor"><svg aria-hidden="true" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg></a>Deploying to a Kubernetes Cluster</h1>\n<p><a href="https://kubernetes.io/" target="_blank" rel="nofollow noopener noreferrer">Kubernetes</a> has become the most popular way to deploy, run and manage containers in production.\nBoth <a href="https://cloud.google.com/kubernetes-engine/" target="_blank" rel="nofollow noopener noreferrer">Google Cloud Platform</a>, <a href="https://azure.microsoft.com/en-us/services/container-service/kubernetes/" target="_blank" rel="nofollow noopener noreferrer">Microsoft Azure</a>\nand <a href="https://aws.amazon.com/eks/" target="_blank" rel="nofollow noopener noreferrer">Amazon Web Services</a> provide managed Kubernetes environment.</p>\n<p><a href="/docs/distribution/index">The official API Platform distribution</a> contains a built-in <a href="https://helm.sh/" target="_blank" rel="nofollow noopener noreferrer">Helm</a> (the k8s\npackage manager) chart to deploy in a wink on any of these platforms.</p>\n<h2 id="preparing-your-cluster-and-your-local-machine"><a href="#preparing-your-cluster-and-your-local-machine" aria-hidden="true" class="anchor"><svg aria-hidden="true" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg></a>Preparing Your Cluster and Your Local Machine</h2>\n<ol>\n<li>Create a Kubernetes cluster on your preferred Cloud provider or install Kubernetes locally on your servers</li>\n<li>Install <a href="https://helm.sh/" target="_blank" rel="nofollow noopener noreferrer">Helm</a> locally and on your cluster following their documentation</li>\n<li>Be sure to be connected to the right Kubernetes container</li>\n<li>Update the Helm repo: <code>helm repo update</code></li>\n</ol>\n<h2 id="creating-and-publishing-the-docker-images"><a href="#creating-and-publishing-the-docker-images" aria-hidden="true" class="anchor"><svg aria-hidden="true" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg></a>Creating and Publishing the Docker Images</h2>\n<ol>\n<li>\n<p>Build the PHP and Nginx Docker images:</p>\n<div class="gatsby-highlight">\n      <pre class="language-none"><code>docker build -t gcr.io/test-api-platform/php -t gcr.io/test-api-platform/php:latest api\ndocker build -t gcr.io/test-api-platform/nginx -t gcr.io/test-api-platform/nginx:latest -f api/Dockerfile.nginx api\ndocker build -t gcr.io/test-api-platform/varnish -t gcr.io/test-api-platform/varnish:latest -f api/Dockerfile.varnish api</code></pre>\n      </div>\n</li>\n<li>\n<p>Push your images to your Docker registry, example with <a href="https://cloud.google.com/container-registry/" target="_blank" rel="nofollow noopener noreferrer">Google Container Registry</a>:</p>\n<div class="gatsby-highlight">\n      <pre class="language-none"><code>gcloud docker -- push gcr.io/test-api-platform/php\ngcloud docker -- push gcr.io/test-api-platform/nginx\ngcloud docker -- push gcr.io/test-api-platform/varnish</code></pre>\n      </div>\n</li>\n</ol>\n<h2 id="deploying"><a href="#deploying" aria-hidden="true" class="anchor"><svg aria-hidden="true" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg></a>Deploying</h2>\n<p>Deploy your API to the container:</p>\n<div class="gatsby-highlight">\n      <pre class="language-none"><code>helm install ./api/helm/api --namespace=baz --name baz \\\n    --set php.repository=gcr.io/test-api-platform/php \\\n    --set nginx.repository=gcr.io/test-api-platform/nginx \\\n    --set secret=MyAppSecretKey \\\n    --set postgresql.postgresPassword=MyPgPassword \\\n    --set postgresql.persistence.enabled=true \\\n    --set corsAllowUrl=\'^https?://[a-z\\]*\\.mywebsite.com$\'</code></pre>\n      </div>\n<p>If you prefer to use a managed DBMS like <a href="https://www.heroku.com/postgres" target="_blank" rel="nofollow noopener noreferrer">Heroku Postgres</a> or\n<a href="https://cloud.google.com/sql/docs/postgres/" target="_blank" rel="nofollow noopener noreferrer">Google Cloud SQL</a> (recommended):</p>\n<div class="gatsby-highlight">\n      <pre class="language-none"><code>helm install --name api ./api/helm/api \\\n    # ...\n    --set postgresql.enabled=false \\\n    --set postgresql.url=pgsql://username:password@host/database?serverVersion=9.6</code></pre>\n      </div>\n<p>If you want to use a managed Varnish such as <a href="https://www.fastly.com" target="_blank" rel="nofollow noopener noreferrer">Fastly</a> for the invalidation cache mechanism\nprovided by API Platform:</p>\n<div class="gatsby-highlight">\n      <pre class="language-none"><code>helm install --name api ./api/helm/api \\\n    # ...\n    --set varnish.enabled=false \\\n    --set varnish.url=https://myvarnish.com</code></pre>\n      </div>\n<p>Finally, build the <code>client</code> and <code>admin</code> JavaScript apps and <a href="https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md#deployment" target="_blank" rel="nofollow noopener noreferrer">deploy them on a static\nwebsite hosting service</a>.</p>\n<h2 id="initializing-the-database"><a href="#initializing-the-database" aria-hidden="true" class="anchor"><svg aria-hidden="true" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg></a>Initializing the Database</h2>\n<p>Before running your application for the first time, be sure to create the database schema:</p>\n<div class="gatsby-highlight">\n      <pre class="language-none"><code>PHP_POD=$(kubectl --namespace=bar get pods -l app=php -o jsonpath="{.items[0].metadata.name}")\nkubectl --namespace=bar exec -it $PHP_POD -- bin/console doctrine:schema:create</code></pre>\n      </div>'},navDoc:{edges:[{node:{title:"The Distribution",path:"distribution",items:[{id:"index",title:"Creating a Fully Featured API in 5 Minutes",anchors:null},{id:"testing",title:"Testing and Specifying the API",anchors:null}]}},{node:{title:"The API Component",path:"core",items:[{id:"index",title:"Introduction",anchors:null},{id:"getting-started",title:"Getting Started",anchors:[{id:"installing-api-platform-core",title:"Installing API Platform Core"},{id:"before-reading-this-documentation",title:"Before Reading this Documentation"},{id:"mapping-the-entities",title:"Mapping the Entities"}]},{id:"configuration",title:"Configuration",anchors:null},{id:"operations",title:"Operations",anchors:[{id:"enabling-and-disabling-operations",title:"Enabling and Disabling Operations"},{id:"configuring-operations",title:"Configuring Operations"},{id:"subresources",title:"Subresources"},{id:"creating-custom-operations-and-controllers",title:"Creating Custom Operations and Controllers"}]},{id:"default-order",title:"Overriding Default Order",anchors:null},{id:"filters",title:"Filters",anchors:[{id:"doctrine-orm-filters",title:"Doctrine ORM Filters"},{id:"serializer-filters",title:"Serializer Filters"},{id:"creating-custom-filters",title:"Creating Custom Filters"},{id:"apifilter-annotation",title:"ApiFilter Annotation"}]},{id:"serialization",title:"The Serialization Process",anchors:[{id:"overall-process",title:"Overall Process"},{id:"available-serializers",title:"Available Serializers"},{id:"the-serialization-context-groups-and-relations",title:"The Serialization Context, Groups and Relations"},{id:"using-serialization-groups",title:"Using Serialization Groups"},{id:"using-different-serialization-groups-per-operation",title:"Using Different Serialization Groups per Operation"},{id:"changing-the-serialization-context-dynamically",title:"Changing the Serialization Context Dynamically"},{id:"changing-the-serialization-context-on-a-per-item-basis",title:"Changing the Serialization Context on a Per Item Basis"},{id:"name-conversion",title:"Name Conversion"},{id:"decorating-a-serializer-and-add-extra-data",title:"Decorating a Serializer and Add Extra Data"},{id:"entity-identifier-case",title:"Entity Identifier Case"},{id:"embedding-the-json-ld-context",title:"Embedding the JSON-LD Context"}]},{id:"validation",title:"Validation",anchors:[{id:"using-validation-groups",title:"Using Validation Groups"},{id:"dynamic-validation-groups",title:"Dynamic Validation Groups"},{id:"error-levels-and-payload-serialization",title:"Error Levels and Payload Serialization"}]},{id:"errors",title:"Error Handling",anchors:[{id:"converting-php-exceptions-to-http-errors",title:"Converting PHP Exceptions to HTTP Errors"}]},{id:"pagination",title:"Pagination",anchors:[{id:"disabling-the-pagination",title:"Disabling the Pagination"},{id:"changing-the-number-of-items-per-page",title:"Changing the Number of Items per Page"},{id:"partial-pagination",title:"Partial Pagination"}]},{id:"events",title:"The Event System",anchors:null},{id:"content-negotiation",title:"Content Negotiation",anchors:[{id:"enabling-several-formats",title:"Enabling Several Formats"},{id:"registering-a-custom-serializer",title:"Registering a Custom Serializer"},{id:"creating-a-responder",title:"Creating a Responder"},{id:"writing-a-custom-normalizer",title:"Writing a Custom Normalizer"}]},{id:"external-vocabularies",title:"Using External JSON-LD Vocabularies",anchors:null},{id:"extending-jsonld-context",title:"Extending JSON-LD context",anchors:null},{id:"data-providers",title:"Data Providers",anchors:[{id:"custom-collection-data-provider",title:"Custom Collection Data Provider"},{id:"custom-item-data-provider",title:"Custom Item Data Provider"},{id:"injecting-the-serializer-in-an-itemdataprovider",title:'Injecting the Serializer in an "ItemDataProvider"'}]},{id:"extensions",title:"Extensions",anchors:[{id:"custom-extension",title:"Custom Extension"},{id:"example",title:"Filter upon the current user"}]},{id:"security",title:"Security",anchors:null},{id:"performance",title:"Performance",anchors:[{id:"enabling-the-builtin-http-cache-invalidation-system",title:"Enabling the Builtin HTTP Cache Invalidation System"},{id:"enabling-the-metadata-cache",title:"Enabling the Metadata Cache"},{id:"using-ppm-php-pm",title:"Using PPM (PHP-PM)"},{id:"doctrine-queries-and-indexes",title:"Doctrine Queries and Indexes"}]},{id:"operation-path-naming",title:"Operation Path Naming",anchors:[{id:"configuration",title:"Configuration"},{id:"create-a-custom-operation-path-resolver",title:"Create a Custom Operation Path Naming"}]},{id:"form-data",title:"Accept application/x-www-form-urlencoded Form Data",anchors:null},{id:"fosuser-bundle",title:"FOSUserBundle Integration",anchors:[{id:"installing-the-bundle",title:"Installing the Bundle"},{id:"enabling-the-bridge",title:"Enabling the Bridge"},{id:"creating-a-user-entity-with-serialization-groups",title:'Creating a "User" Entity with Serialization Groups'}]},{id:"jwt",title:"Adding a JWT authentication using LexikJWTAuthenticationBundle",anchors:[{id:"testing-with-swagger",title:"Testing with Swagger"},{id:"testing-with-behat",title:"Testing with Behat"}]},{id:"nelmio-api-doc",title:"NelmioApiDocBundle integration",anchors:null},{id:"angularjs-integration",title:"AngularJS Integration",anchors:[{id:"restangular",title:"Restangular"},{id:"ng-admin",title:"ng-admin"}]},{id:"swagger",title:"Swagger Support",anchors:[{id:"override-swagger-documentation",title:"Override Swagger documentation"}]},{id:"graphql",title:"GraphQL Support",anchors:[{id:"overall-view",title:"Overall View"},{id:"enabling-graphql",title:"Enabling GraphQL"},{id:"graphiql",title:"GraphiQL"}]},{id:"serialization",title:"The Serialization Process",anchors:[{id:"overall-process",title:"Overall Process"},{id:"available-serializers",title:"Available Serializers"},{id:"decorating-a-serializer-and-add-extra-data",title:"Decorating a Serializer and Add Extra Data"}]},{id:"dto",title:"Handling Data Transfer Objects (DTOs)",anchors:null}]}},{node:{title:"The Schema Generator Component",path:"schema-generator",items:[{id:"index",title:"Introduction",anchors:null},{id:"getting-started",title:"Getting Started",anchors:null},{id:"configuration",title:"Configuration",anchors:null}]}},{node:{title:"The Admin Component",path:"admin",items:[{id:"index",title:"Introduction",anchors:[{id:"features",title:"Features"}]},{id:"getting-started",title:"Getting Started",anchors:[{id:"installation",title:"Installation"},{id:"creating-the-admin",title:"Creating the Admin"},{id:"customizing-the-admin",title:"Customizing the Admin"}]},{id:"authentication-support",title:"Authentication Support",anchors:null},{id:"handling-relations-to-collections",title:"Handling Relations to Collections",anchors:[{id:"using-an-autocomplete-input-for-relations",title:"Using an Autocomplete Input for Relations"}]}]}},{node:{title:"The Client Generator Component",path:"client-generator",items:[{id:"index",title:"Introduction",anchors:[{id:"features",title:"Features"}]},{id:"react",title:"React generator",anchors:null},{id:"vuejs",title:"Vue.js generator",anchors:null},{id:"troubleshooting",title:"Troubleshooting",anchors:null}]}},{node:{title:"Deployment",path:"deployment",items:[{id:"index",title:"Introduction",anchors:null},{id:"kubernetes",title:"Deploying to a Kubernetes Cluster",anchors:null},{id:"heroku",title:"Deploying an API Platform App on Heroku",anchors:null}]}},{node:{title:"Extra",path:"extra",items:[{id:"releases",title:"The Release Process",anchors:null},{id:"philosophy",title:"The Project's Philosophy",anchors:null},{id:"troubleshooting",title:"Troubleshooting",anchors:null},{id:"contribution-guides",title:"Contribution Guides",anchors:null},{id:"conduct",title:"Contributor Code Of Conduct",anchors:null}]}}]}},pathContext:{path:"docs/deployment/kubernetes",current:{path:"docs/deployment/kubernetes",title:"Deployment - Deploying to a Kubernetes Cluster"},prev:{path:"docs/deployment/index",title:"Introduction",rootPath:"Deployment"},next:{path:"docs/deployment/heroku",title:"Deploying an API Platform App on Heroku",rootPath:"Deployment"}}}}});
//# sourceMappingURL=path---docs-deployment-kubernetes-55df7013dfb5c097f1a0.js.map