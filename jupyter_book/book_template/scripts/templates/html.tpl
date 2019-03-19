{% extends 'basic.tpl' %}

{% block in_prompt -%}
{% endblock in_prompt -%}

{% block output_area_prompt %}
{% endblock output_area_prompt -%}

<!-- Remove input cells if they're empty -->
{% block input %}
{%- if cell.source != '' %}
{{- super() -}}
{% endif %}
{% endblock input %}