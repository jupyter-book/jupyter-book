{% extends 'basic.tpl' %}
{% from 'celltags.tpl' import celltags %}

{% block any_cell %}
<div class="jb_cell{{ celltags(cell) }}">
{{ super() }}
</div>
{% endblock any_cell %}


{% block output %}
<div class="jb_output_wrapper{%- if 'interactive' in cell.metadata.tags %} output_widget_view {% endif %} }}">
{{- super() -}}
</div>
{%- endblock output %}
