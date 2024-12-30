package com.springBoot.Template.Repository;

import com.springBoot.Template.Model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User,Long> {
    Optional<User> findByUserName(String userName);
    boolean existsByUserName(String userName);
    @Query(value = "SELECT * FROM user u WHERE u.user_name = :userName", nativeQuery = true)
    User findByUserDetails (@Param("userName")String userName);
}

