API SITE GOALS
==============

The goals for the site are to provide a unified, single page - browser
viewable, but capable of bring printed - for all APIs relevant to OpenStack.
The intent is primarily around immediate usability:
 * list all the APIs in a single location
 * had additional discoverable detail about those apis without having to navigate to other sites/pages

Top level page should give a narrative overview, probably fairly short,
of the OpenStack API and include links to OpenStack resources.

A similiar top-level page would include common elements through-out the API
(how authentication is handled, how errors are handled, etc).

A final page is the API docs themselves as the single page. This page would
combine what is currently separate documents (COMPUTE, STORAGE, IMAGE, and
IDENTITY) into a single unified API documentation set.

IMPLEMENTATION
--------------

The mockup page at http://heckj.github.com/api-site-mock/ is the single
index page mockup.

I am envisioning a top level page above this, with breadcrumbs leading to
the API, that gives a narrative overview of the API.

    .            +- the EC2 & S3 apis
    .            |
    .            +- the OpenStack REST apis
    .            |
    . top_page --+- core concepts, authN
    .            |
    .            +- Error Codes and Responses

API PAGE STRUCTURE
------------------

The API docs page as an index lists the resources, grouped by intent
(servers, storage, etc) - what is currently stored as separate documents.

* [VERB] [URI] //short description//
* [VERB] [URI] //short description//
* [VERB] [URI] //short description//
* [VERB] [URI] //short description//

And each of these elements should have a disclosure mechanism to expand
the detail of the call with similiar structure to what is currently documented
in the docs.openstack.org site. A notable addition of putting in explicit
sample calls (maybe several in the complex API components with many parameters)
would be added to what exists to illustrate what is meant by some of the
parameters - not entirely clear in all cases today.

I have been debating including faults and example error messages in each
API call, but I suspect that would be better illuminated in the common-to-all
API page documentation that is intended as a seperate page.

NOTES
-----

This is modeled after a fusion of the sites:

(example of single page disclosable index)
 * http://developer.wordnik.com/docs

(example of narrative home page)
 * https://dev.twitter.com/docs

(example of index page)
 * https://dev.twitter.com/docs/api


