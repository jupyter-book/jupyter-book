{% extends 'basic.tpl' %}

{% block codecell %}
<div class="cell code{% for tag in cell.metadata.tags %} {{ tag }}{% endfor %}">
{{ super() }}
</div>
{%- endblock codecell %}

XXXXXXXXXXXXXXXXXXXXXXXXX
XX TODO: Figure out how to call the super of the *parent* template, not this one
XXXXXXXXXXXXXXXXXXXXXXXXX


{% block markdowncell %}
<div class="cell markdown{% for tag in cell.metadata.tags %} {{ tag }}{% endfor %}">
{%- if resources.global_content_filter.include_input_prompt-%}
    {{ self.empty_in_prompt() }}
{%- endif -%}
{{ cell.source  | markdown2html | strip_files_prefix }}
</div>
{%- endblock markdowncell %}

<!-- Remove input cells if they're empty -->
{% block input %}
{%- if cell.source != '' %}
{{ super() }}
{% endif %}
{% endblock input %}
