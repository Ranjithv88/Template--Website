package com.springBoot.Template.Repository;

import com.springBoot.Template.Model.LogOut;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface LogoutRepository extends JpaRepository<LogOut, Long> {
    boolean existsByToken(String token);
}

