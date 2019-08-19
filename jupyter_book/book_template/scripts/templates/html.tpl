{% extends 'basic.tpl' %}

<!-- Remove input cells if they're empty. Same as nbconvert basic w/ the extra class -->
{% block input_group %}
<div class="jb_input{% if 'hide_input' in cell.metadata.tags or 'hidecode' in cell.metadata.tags %} hidecode{% endif %}" >
{{ super() }}
</div>
{% endblock input_group %}


{% block output %}
<div class="jb_output_wrapper{% if 'interactive' in cell.metadata.tags %} output_widget_view{% endif %}">
{{- super() -}}
</div>
{%- endblock output %}
