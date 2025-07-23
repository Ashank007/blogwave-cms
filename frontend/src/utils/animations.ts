import gsap from "gsap"
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime"

export const animatePageIn = (start:boolean) => {
  const bannerOne = document.getElementById("banner-1")
  const bannerTwo = document.getElementById("banner-2")
  const bannerThree = document.getElementById("banner-3")
  const bannerFour = document.getElementById("banner-4")

  if (bannerOne && bannerTwo && bannerThree && bannerFour) {
    if(start){

      const tl = gsap.timeline()
      
      tl.set([bannerOne, bannerTwo, bannerThree, bannerFour], {
        xPercent: 0,
      }).to([bannerOne, bannerTwo, bannerThree, bannerFour], {
        xPercent: 100,
        stagger: 0.1,
      })
    }else{
      gsap.set([bannerOne, bannerTwo, bannerThree, bannerFour], {
        xPercent: -100,
      })
    }
  }
}

export const animatePageOut = (href: string, router: AppRouterInstance) => {
  const bannerOne = document.getElementById("banner-1")
  const bannerTwo = document.getElementById("banner-2")
  const bannerThree = document.getElementById("banner-3")
  const bannerFour = document.getElementById("banner-4")

  if (bannerOne && bannerTwo && bannerThree && bannerFour) {
    const tl = gsap.timeline()

    tl.set([bannerOne, bannerTwo, bannerThree, bannerFour], {
      xPercent: -100,
    }).to([bannerOne, bannerTwo, bannerThree, bannerFour], {
      xPercent: 0,
      stagger: 0.1,
      onComplete: () => {
        router.push(href)
      },
    })
  }
}