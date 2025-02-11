package com.springBoot.Template.Annotations;

import jakarta.persistence.AttributeConverter;
import jakarta.persistence.Converter;

// Boolean Value Stored On DataBase
@Converter(autoApply = true)
public class BooleanToStringConverter implements AttributeConverter<Boolean, String> {

    // Convert To Database Column Method
    @Override
    public String convertToDatabaseColumn(Boolean attribute) {
        return attribute != null && attribute ? "true" : "false";
    }

    // convert To Entity Attribute Method
    @Override
    public Boolean convertToEntityAttribute(String dbData) {
        return "true".equalsIgnoreCase(dbData);
    }

}

