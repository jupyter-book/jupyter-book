{%- macro celltags(cell) -%}
    {% if cell.metadata.tags | length > 0 -%}
        {% for tag in cell.metadata.tags -%}
            {{ ' tag_' ~ tag -}}
            {%- if tag == 'hidecode' %} tag_hide_input{% endif %}
        {%- endfor -%}
    {%- endif %}
{%- endmacro %}