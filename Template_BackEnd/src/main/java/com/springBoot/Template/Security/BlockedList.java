package com.springBoot.Template.Security;

import com.springBoot.Template.Model.LogOut;
import com.springBoot.Template.Repository.LogoutRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;

@RequiredArgsConstructor
@Slf4j
@Service
public class BlockedList {

    private final LogoutRepository repository;
    private final JwtUtils jwtUtils;

    public void checked () {
        List<LogOut> data = repository.findAll();
        jwtUtils.init();
        log.info(data.toString());
        for (LogOut datum : data) {
            String temp = datum.getToken();
            if(temp!=null) {
                if (jwtUtils.block(temp.substring(7))) {
                    repository.deleteById(datum.getId());
                    log.info(temp);
                }
            }
        }
    }

}

