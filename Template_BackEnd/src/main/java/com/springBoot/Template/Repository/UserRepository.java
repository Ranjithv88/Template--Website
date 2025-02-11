package com.springBoot.Template.Repository;

import com.springBoot.Template.Model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import java.util.Optional;

// User Repository
@Repository
public interface UserRepository extends JpaRepository<User,Long> {
    // optional method used to Find By UserName
    Optional<User> findByUserName(String userName);
    // Exists By UserName This Method for Return By True Or False
    boolean existsByUserName(String userName);
    // This method is UseName to Get Data from DataBase By Executing Below Query
    @Query(value = "SELECT * FROM user u WHERE u.user_name = :userName", nativeQuery = true)
    User findByUserDetails (@Param("userName")String userName);
}

