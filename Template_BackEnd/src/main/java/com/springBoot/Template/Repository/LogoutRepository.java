package com.springBoot.Template.Repository;

import com.springBoot.Template.Model.LogOut;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

// LogOut Repository
@Repository
public interface LogoutRepository extends JpaRepository<LogOut, Long> {
    // Exists By Token This Method for Return By True Or False
    boolean existsByToken(String token);
}

