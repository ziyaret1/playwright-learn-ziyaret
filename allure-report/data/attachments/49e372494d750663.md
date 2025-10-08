# Page snapshot

```yaml
- generic [ref=e3]:
  - banner [ref=e4]:
    - img "logo" [ref=e5]
  - generic [ref=e7]:
    - heading "Sign In" [level=1] [ref=e9]
    - generic [ref=e10]:
      - generic [ref=e11]:
        - generic [ref=e13]:
          - generic [ref=e14]: Email
          - textbox "Email" [ref=e15]
        - generic [ref=e17]:
          - generic [ref=e18]: Password
          - textbox "Password" [ref=e19]
      - button "Sign in" [ref=e20] [cursor=pointer]
      - link "Registration" [ref=e21] [cursor=pointer]:
        - /url: /registration
        - generic [ref=e22] [cursor=pointer]: Registration
```