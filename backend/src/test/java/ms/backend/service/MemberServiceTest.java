package ms.backend.service;

import ms.backend.domain.Member;
import ms.backend.repository.MemoryMemberRepository;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import static org.assertj.core.api.Assertions.*;
import static org.junit.jupiter.api.Assertions.assertThrows;

class MemberServiceTest {

    MemoryMemberRepository memberRepository;
    MemberService memberService;

    @BeforeEach
    public void beforeEach() {
        memberRepository = new MemoryMemberRepository();
        memberService = new MemberService(memberRepository);
    }

    @AfterEach
    public void afterEach() {
        memberRepository.clearStore();
    }

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


//        memberService.join(member);
//        try {
//            memberService.join(exceptionMember);
//            fail("duplicate detection fail");
//        } catch(IllegalStateException e) {
//            assertThat(e.getMessage()).isEqualTo("이미 존재하는 회원");
//        }

    }

    @Test
    void findMembers() {
    }

    @Test
    void findOne() {
    }
}