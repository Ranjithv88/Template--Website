package com.springBoot.Template.Annotations;

import jakarta.validation.Constraint;
import jakarta.validation.Payload;
import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

// InterFace For Age Validations
@Target({ElementType.FIELD,ElementType.PARAMETER})
@Retention(RetentionPolicy.RUNTIME)
@Constraint(validatedBy = AgeValid.class)
public @interface Decimal {
    String message() default " Age range is 01 to 99 .....! ";
    Class<?>[] groups() default {};
    Class<? extends Payload>[] payload() default {};
}

