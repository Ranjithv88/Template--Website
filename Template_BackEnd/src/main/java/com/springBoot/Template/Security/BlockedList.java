package com.springBoot.Template.Security;

import com.springBoot.Template.Model.LogOut;
import com.springBoot.Template.Repository.LogoutRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

import java.util.List;

@RequiredArgsConstructor
@Slf4j
@Component
public class BlockedList {

    private final LogoutRepository repository;
    private final JwtUtils jwtUtils;

    public void checked () {
        List<LogOut> data = repository.findAll();
        jwtUtils.init();
        log.info(data.toString());
        for (LogOut datum : data) {
            String temp = datum.getToken();
            try {
                if(temp!=null)
                    jwtUtils.decrypt(temp.substring(7));
            } catch (Exception e) {
                throw new RuntimeException(e);
            }
            if (!jwtUtils.validateExpiration(temp)) {
                repository.deleteById(datum.getId());
                log.info(temp);
            }
        }
    }

}

