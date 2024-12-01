package com.springBoot.Template.Annotations;

import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;

public class AgeValid implements ConstraintValidator<Decimal, Integer> {

    @Override
    public boolean isValid(Integer age, ConstraintValidatorContext constraintValidatorContext) {

        return age != null & Integer.toString(age).length()==2 ;
    }

}

