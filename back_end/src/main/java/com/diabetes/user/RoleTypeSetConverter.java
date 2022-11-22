package com.diabetes.user;

import com.diabetes.user.domain.RoleType;

import javax.persistence.AttributeConverter;
import java.util.Arrays;
import java.util.Set;
import java.util.stream.Collectors;

public class RoleTypeSetConverter implements AttributeConverter<Set<RoleType>, String> {
    private static final String SPLIT_CHAR = ",";

    @Override
    public String convertToDatabaseColumn(Set<RoleType> attribute) {
        return attribute.stream().map(Object::toString).collect(Collectors.joining(SPLIT_CHAR));
    }

    @Override
    public Set<RoleType> convertToEntityAttribute(String dbData) {
        return Arrays.stream(dbData.split(SPLIT_CHAR))
                .map(RoleType::valueOf)
                .collect(Collectors.toSet());
    }
}
