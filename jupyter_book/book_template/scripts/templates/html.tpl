{% extends 'basic.tpl' %}

{% block codecell %}
{% if 'remove_cell' not in cell.metadata.tags and 'removecell' not in cell.metadata.tags %}
{{ super() }}
{% endif %}
{%- endblock codecell %}

{% block markdowncell %}
{% if 'remove_cell' not in cell.metadata.tags and 'removecell' not in cell.metadata.tags %}
{{ super() }}
{% endif %}
{%- endblock markdowncell %}

<!-- Remove input cells if they're empty. Same as nbconvert basic w/ the extra class -->
{% block input_group %}
{%- if 'remove_input' not in cell.metadata.tags %}
{%- if cell.source != '' %}
<div class="input{% if 'hide_input' in cell.metadata.tags or 'hidecode' in cell.metadata.tags %} hidecode{% endif %}" >
{{ super() }}
</div>
{% endif %}
{% endif %}
{% endblock input_group %}


{% block output %}
<div class="output_wrapper{% if 'interactive' in cell.metadata.tags %} output_widget_view{% endif %}">
{{- super() -}}
</div>
{%- endblock output %}
