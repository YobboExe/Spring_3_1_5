package ru.kata.spring.boot_security.demo.Deserializer;

import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.DeserializationContext;
import com.fasterxml.jackson.databind.JsonDeserializer;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import ru.kata.spring.boot_security.demo.models.Role;

import java.io.IOException;
import java.util.HashSet;
import java.util.Set;

public class RoleSetDeserializer extends JsonDeserializer<Set<Role>> {
    @Override
    public Set<Role> deserialize(JsonParser jp, DeserializationContext ctxt)
            throws IOException {
        ObjectMapper mapper = (ObjectMapper) jp.getCodec();
        JsonNode node = mapper.readTree(jp);
        Set<Role> roles = new HashSet<>();
        if (node.isArray()) {
            for (JsonNode roleNode : node) {
                roles.add(mapper.treeToValue(roleNode, Role.class));
            }
        }
        return roles;
    }
}

