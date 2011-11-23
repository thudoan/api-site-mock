DESIGN ELEMENTS
===============

The design elements are based on twitter bootstrap
(http://twitter.github.com/bootstrap/), for quick general layout that is
a bit more concise than blueprint. (It also happens to be what the horizon
project is using for design)

I have been pretty sparing with javascript, but one of the elements of the
site is hiding/showing the details of each call so that a single large page
acts as both an index and discoverable detail in one shot. The javascript
is using straight jQuery.


Readability Notes:
------------------

Jesse pointed out https://www.parse.com/docs/rest, which is beautifully
readable in an immediate format. The font is larger and higher contrast, and
the color coding in URL and data examples stands out nicely with additional
use of a monospaced font.

Digging into the CSS:

The default font size:

    .p_docs p {
        font-size: 17px;
        line-height: 22px;
    }

And the blue headers:

    .p_docs h2 {
        margin-bottom: 25px;
        -moz-border-radius: 3px;
        -webkit-border-radius: 3px;
        -o-border-radius: 3px;
        -ms-border-radius: 3px;
        -khtml-border-radius: 3px;
        border-radius: 3px;
        margin-top: 35px;
        border-bottom: 1px solid #CBE3F3;
        background: #E0EEF8;
        padding: 10px;
        color: #0067AB;
        font-size: 22px;
    }

    .p_docs h3 {
        color: #0067AB;
        font-size: 20px;
        font-weight: 600;
        margin-bottom: 15px;
        margin-top: 35px;
    }

    .p_docs h4 {
        color: #0067AB;
        font-size: 17px;
        font-weight: 600;
        margin-bottom: 15px;
        margin-top: 20px;
    }


code has the following style:

    code {
        font-size: .9em;
        font-family: "Monaco","Courier New",Courier;
        color: green;
        line-height: 1.3em;
    }

They are actively using syntax highlighting tools that can describe bash and
javascript.

Notes:

.label.verb { //(span class="label verb")
    padding: 3px 6px 4px 6px;
    font-size: 17px;
    background-color: #0067AB;
}


