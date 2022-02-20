package ms.backend.service;

import ms.backend.domain.Member;
import ms.backend.repository.MemberRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import javax.transaction.Transactional;

import static org.assertj.core.api.Assertions.*;
import static org.junit.jupiter.api.Assertions.assertThrows;

@SpringBootTest
@Transactional
class MemberServiceIntegrationTest {

    @Autowired MemberService memberService;
    @Autowired MemberRepository memberRepository;

    @Test
    void join() {
        Member member = new Member();
        member.setName("hello");

        Long saveId = memberService.join(member);

        Member res = memberService.findOne(saveId).get();
        assertThat(member.getName()).isEqualTo(res.getName());
    }

    @Test
    void joinException() {
        Member member = new Member(), exceptionMember = new Member();
        member.setName("hello");
        exceptionMember.setName("hello");

        memberService.join(member);
        IllegalStateException e = assertThrows(IllegalStateException.class, () -> memberService.join(exceptionMember));

        assertThat(e.getMessage()).isEqualTo("이미 존재하는 회원");
    }

    @Test
    void findMembers() {
    }

    @Test
    void findOne() {
    }
}